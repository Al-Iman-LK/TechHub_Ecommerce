import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import adminMiddleware from '../middleware/admin.js';

const router = express.Router();

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard statistics
// @access  Admin
router.get('/dashboard', adminMiddleware, async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { status: 'delivered' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    const lowStockProducts = await Product.find({ quantity: { $lte: 10 } })
      .select('name quantity')
      .limit(10);

    res.json({
      success: true,
      data: {
        stats: {
          totalProducts,
          totalOrders,
          totalUsers,
          totalRevenue: totalRevenue[0]?.total || 0
        },
        recentOrders,
        lowStockProducts
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data'
    });
  }
});

// @route   GET /api/admin/products
// @desc    Get all products for admin management
// @access  Admin
router.get('/products', adminMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments();

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: products.length,
          totalCount: total
        }
      }
    });
  } catch (error) {
    console.error('Admin products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Update product
// @access  Admin
router.put('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Admin update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product'
    });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Admin
router.delete('/products/:id', adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Admin delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    });
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders for admin management
// @access  Admin
router.get('/orders', adminMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('products.product', 'name price images')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Order.countDocuments();

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: orders.length,
          totalCount: total
        }
      }
    });
  } catch (error) {
    console.error('Admin orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status
// @access  Admin
router.put('/orders/:id/status', adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Admin update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
});

// @route   GET /api/admin/users
// @desc    Get all users for admin management
// @access  Admin
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: users.length,
          totalCount: total
        }
      }
    });
  } catch (error) {
    console.error('Admin users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

export default router;
