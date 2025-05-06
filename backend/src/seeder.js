import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from './config/db.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Cancella dati esistenti
    await Product.deleteMany();
    await User.deleteMany();

    // Crea utenti
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
    });

    // Aggiungi utenti normali
    const user1 = await User.create({
      name: 'Mario Rossi',
      email: 'mario@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false,
    });
    
    const user2 = await User.create({
      name: 'Giulia Bianchi',
      email: 'giulia@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: false,
    });

    console.log('Utenti creati con successo!');

    // Crea prodotti
    const products = [
      {
        name: 'Air Jordan 1 High OG "Chicago"',
        brand: 'Nike',
        category: 'Sneakers',
        description: 'La leggendaria Air Jordan 1 High nella colorazione originale Chicago. Un pezzo di storia delle sneaker.',
        rating: 4.8,
        numReviews: 12,
        price: 189.99,
        countInStock: 7,
        sizes: [40, 41, 42, 43, 44, 45],
        images: ['https://via.placeholder.com/640x480?text=Jordan+1+Chicago'],
        isLimited: true,
        user: adminUser._id
      },
      {
        name: 'Yeezy Boost 350 V2 "Zebra"',
        brand: 'Adidas',
        category: 'Sneakers',
        description: 'La famosa Yeezy Boost 350 V2 nella colorazione zebra. Design futuristico con comfort superiore.',
        rating: 4.5,
        numReviews: 8,
        price: 220.00,
        countInStock: 5,
        sizes: [39, 40, 41, 42, 43, 44, 45],
        images: ['https://via.placeholder.com/640x480?text=Yeezy+Zebra'],
        isLimited: true,
        user: adminUser._id
      },
      {
        name: 'Dunk Low SB "Travis Scott"',
        brand: 'Nike',
        category: 'Sneakers',
        description: 'Edizione speciale Nike Dunk Low SB in collaborazione con Travis Scott.',
        rating: 4.9,
        numReviews: 15,
        price: 1200.00,
        countInStock: 2,
        sizes: [41, 42, 43],
        images: ['https://via.placeholder.com/640x480?text=Travis+Scott+Dunk'],
        isLimited: true,
        user: adminUser._id
      }
    ];

    await Product.insertMany(products);

    console.log('Dati importati!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Dati eliminati!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}