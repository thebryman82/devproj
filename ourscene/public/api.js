import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

export const fetchData = async () => {
  const response = await axios.get(`${baseUrl}/data`);
  return response.data;
};
