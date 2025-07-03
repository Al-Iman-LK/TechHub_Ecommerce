import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techhub');
    console.log('Connected to MongoDB');

    // Delete existing admin user if it exists
    await User.deleteOne({ email: 'admin@techhub.com' });
    console.log('Cleaned up existing admin user');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@techhub.com',
      password: 'admin123', // This will be hashed by the pre-save middleware in User model
      role: 'admin',
      isEmailVerified: true
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@techhub.com');
    console.log('Password: admin123');
    console.log('Role: admin');
    console.log('You can now login as admin using the regular login form');

    // Test the login
    const loginTest = await User.findOne({ email: 'admin@techhub.com' }).select('+password');
    if (loginTest) {
      console.log('✅ Admin user found in database');
      console.log('✅ Password field exists:', !!loginTest.password);
      console.log('✅ Role is admin:', loginTest.role === 'admin');
    }

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
