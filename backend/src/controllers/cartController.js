import asyncHandler from '../middleware/asyncHandler.js';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';

// @desc    Ottieni il carrello dell'utente
// @route   GET /api/cart
// @access  Private
export const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // Se il carrello non esiste, ne creiamo uno vuoto
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [],
    });
  }

  res.json(cart);
});

// @desc    Aggiungi un prodotto al carrello
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const { productId, qty, size } = req.body;

  // Validate input
  if (!productId || !qty || !size) {
    res.status(400);
    throw new Error('Dati mancanti: productId, qty e size sono obbligatori');
  }

  // Verifica che il prodotto esista
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Prodotto non trovato');
  }

  // Verifica che il prodotto sia disponibile
  if (product.countInStock < qty) {
    res.status(400);
    throw new Error('Quantità richiesta non disponibile');
  }

  // Verifica che la taglia sia disponibile
  if (!product.sizes.includes(size)) {
    res.status(400);
    throw new Error('Taglia non disponibile');
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // Se il carrello non esiste, ne creiamo uno nuovo
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [],
    });
  }

  // Verifica se il prodotto è già nel carrello con la stessa taglia
  const existingItemIndex = cart.cartItems.findIndex(
    item => item.product.toString() === productId && item.size === size
  );

  if (existingItemIndex >= 0) {
    // Se il prodotto è già nel carrello, aggiorniamo la quantità
    cart.cartItems[existingItemIndex].qty = qty;
  } else {
    // Altrimenti aggiungiamo il prodotto al carrello
    cart.cartItems.push({
      product: productId,
      name: product.name,
      size: size,
      image: product.images[0], // Prendiamo la prima immagine
      price: product.price,
      qty: qty,
    });
  }

  await cart.save();
  res.status(201).json(cart);
});

// @desc    Aggiorna la quantità di un prodotto nel carrello
// @route   PUT /api/cart/:itemId
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
  const { qty } = req.body;
  const { itemId } = req.params;

  // Validate input
  if (!qty) {
    res.status(400);
    throw new Error('Quantità non specificata');
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Carrello non trovato');
  }

  // Trova l'item nel carrello
  const cartItemIndex = cart.cartItems.findIndex(
    item => item._id.toString() === itemId
  );

  if (cartItemIndex === -1) {
    res.status(404);
    throw new Error('Prodotto non trovato nel carrello');
  }

  // Ottieni il prodotto per verificare la disponibilità
  const product = await Product.findById(cart.cartItems[cartItemIndex].product);
  
  if (!product || product.countInStock < qty) {
    res.status(400);
    throw new Error('Quantità richiesta non disponibile');
  }

  // Aggiorna la quantità
  cart.cartItems[cartItemIndex].qty = qty;

  await cart.save();
  res.json(cart);
});

// @desc    Rimuovi un prodotto dal carrello
// @route   DELETE /api/cart/:itemId
// @access  Private
export const removeFromCart = asyncHandler(async (req, res) => {
  const { itemId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Carrello non trovato');
  }

  // Filtra l'item da rimuovere
  cart.cartItems = cart.cartItems.filter(
    item => item._id.toString() !== itemId
  );

  await cart.save();
  res.json(cart);
});

// @desc    Svuota il carrello
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('Carrello non trovato');
  }

  cart.cartItems = [];
  await cart.save();

  res.json({ message: 'Carrello svuotato' });
});