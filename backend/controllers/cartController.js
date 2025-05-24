import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Get the cart for the user
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // Create a new cart if not found
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    // Check if product is already in the cart
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      // Update the quantity if the product is already in the cart
      existingItem.quantity += quantity;
    } else {
      // Add the product to the cart if not already in the cart
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart
    await cart.save();
  }

  res.status(201).json(cart);
});

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  if (cart) {
    // Calculate total price
    const totalPrice = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    res.json({
      cart,
      totalPrice,
    });
  } else {
    res.status(404);
    throw new Error("Cart not found");
  }
});

// @desc    Update item quantity in cart
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.product.toString() === productId);

  if (!item) {
    res.status(404);
    throw new Error("Item not found in cart");
  }

  // Update the quantity of the item in the cart
  item.quantity = quantity;

  await cart.save();
  res.json(cart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeItemFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Find the user's cart
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  // Check if item exists in cart
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    res.status(404);
    throw new Error("Item not found in cart");
  }

  // Remove the item
  cart.items.splice(itemIndex, 1);

  // Recalculate total price if needed
  cart.totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  await cart.save();

  res.status(200).json({
    message: "Item removed from cart",
    cart,
  });
});

// @desc    Clear user's cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  // Clear all items from the cart
  cart.items = [];

  await cart.save();
  res.json({ message: "Cart cleared" });
});

export {
  addItemToCart,
  getCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
};
