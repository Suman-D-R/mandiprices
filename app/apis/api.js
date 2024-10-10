import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const GET = async (url, params) => {
  const response = await axios.get(`${BASE_URL}/${url}`, { params });
  return response.data;
};
