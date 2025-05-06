import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Proteggi le route
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // Leggi JWT dal cookie
  token = req.cookies.jwt;
  
  if (!token) {
    res.status(401);
    throw new Error('Non autorizzato, nessun token');
  }
  
  try {
    // Verifica il token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Aggiungi l'utente alla request (esclusa la password)
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