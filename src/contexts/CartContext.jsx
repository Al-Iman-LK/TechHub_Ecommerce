import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        subtotal: action.payload.subtotal || 0,
        loading: false,
        error: null
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        subtotal: action.payload.subtotal || 0
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        subtotal: action.payload.subtotal || 0
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: action.payload.items || [],
        totalItems: action.payload.totalItems || 0,
        subtotal: action.payload.subtotal || 0
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        subtotal: 0
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  loading: false,
  error: null
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isAuthenticated, token } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      loadCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [isAuthenticated, token]);

  // Load cart from server
  const loadCart = async () => {
    if (!isAuthenticated) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await axios.get(`${API_URL}/api/cart`);

      if (response.data.success) {
        dispatch({
          type: 'SET_CART',
          payload: response.data.data
        });
      }
    } catch (error) {
      console.error('Load cart error:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: error.response?.data?.message || 'Failed to load cart'
      });
    }
  };

  // Add item to cart
  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return { success: false };
    }

    try {
      const response = await axios.post(`${API_URL}/api/cart/add`, {
        productId,
        quantity
      });

      if (response.data.success) {
        dispatch({
          type: 'ADD_ITEM',
          payload: response.data.data
        });

        toast.success('Item added to cart');
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Update item quantity
  const updateQuantity = async (productId, quantity) => {
    if (!isAuthenticated) return { success: false };

    try {
      const response = await axios.put(`${API_URL}/api/cart/update`, {
        productId,
        quantity
      });

      if (response.data.success) {
        dispatch({
          type: 'UPDATE_ITEM',
          payload: response.data.data
        });

        if (quantity === 0) {
          toast.success('Item removed from cart');
        } else {
          toast.success('Cart updated');
        }
        
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update cart';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    if (!isAuthenticated) return { success: false };

    try {
      const response = await axios.delete(`${API_URL}/api/cart/remove/${productId}`);

      if (response.data.success) {
        dispatch({
          type: 'REMOVE_ITEM',
          payload: response.data.data
        });

        toast.success('Item removed from cart');
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to remove item';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!isAuthenticated) return { success: false };

    try {
      const response = await axios.delete(`${API_URL}/api/cart/clear`);

      if (response.data.success) {
        dispatch({ type: 'CLEAR_CART' });
        toast.success('Cart cleared');
        return { success: true };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to clear cart';
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  // Get cart item count for a specific product
  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
  };

  // Check if product is in cart
  const isInCart = (productId) => {
    return state.items.some(item => item.product._id === productId);
  };

  const value = {
    items: state.items,
    totalItems: state.totalItems,
    subtotal: state.subtotal,
    loading: state.loading,
    error: state.error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    isInCart,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
