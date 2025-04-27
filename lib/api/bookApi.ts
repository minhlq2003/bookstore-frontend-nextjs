import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export const getBookById = async (bookId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};

export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book:', error);
    throw error;
  }
};
