import User from "../models/userModel.js";

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    let cartData = user.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    await user.update({ cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Update cart quantity
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    let cartData = user.cartData || {};

    if (!cartData[itemId]) cartData[itemId] = {};

    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      // Remove size entry if quantity <= 0
      delete cartData[itemId][size];
      // If no sizes left, remove itemId
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    await user.update({ cartData });
    res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Get cart data for a user
const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    const cartData = user.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addToCart, updateCart, getUserCart };
