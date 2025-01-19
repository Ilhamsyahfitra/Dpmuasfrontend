import axios from 'axios';

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

export const fetchComicsFromGoogle = async (category) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${category}&key=${API_KEY}`);
    return response.data.items || [];
  } catch (error) {
    console.error('Error fetching data from Google Books API:', error);
    return [];
  }
};
