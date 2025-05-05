import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './src/config/db.js';

// Carica variabili d'ambiente
dotenv.config();

// Connessione al database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // URL del tuo frontend Vite
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Cartella per file statici
app.use('/uploads', express.static('uploads'));

// Rotta base
app.get('/', (req, res) => {
  res.json({ message: 'API SneakerVault funzionante' });
});

// Importa le route (assicurati di modificare anche questi file per usare ES modules)
// import userRoutes from './src/routes/userRoutes.js';
// import productRoutes from './src/routes/productRoutes.js';
// import orderRoutes from './src/routes/orderRoutes.js';

// app.use('/api/users', userRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// Gestione errori 404
app.use((req, res) => {
  res.status(404).json({ message: 'Rotta non trovata' });
});

// Middleware per errori
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

// Avvio server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server attivo sulla porta ${PORT}`);
});