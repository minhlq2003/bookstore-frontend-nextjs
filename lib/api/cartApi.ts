import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const getCartItems = async (userId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/carts/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const addItemToCart = async (userId: string, bookId: string, quantity: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/carts/${userId}/items`, { bookId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error add item to cart:', error);
    throw error;
  }
};

export const deleteItemInCart = async (userId: string, bookId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/carts/${userId}/items/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error add item to cart:', error);
    throw error;
  }
};
