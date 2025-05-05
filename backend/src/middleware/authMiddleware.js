import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Funzione per gestire eccezioni asincrone
export const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Proteggi le route
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // Verifica se c'è un token nei cookie o nell'header
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    res.status(401);
    throw new Error('Non autorizzato, nessun token');
  }
  
  try {
    // Verifica il token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Aggiungi l'utente alla request
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Non autorizzato, token non valido');
  }
});

// Middleware per admin
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Non autorizzato come admin');
  }
};