import axios from 'axios';

import { BASE_URL, API_ENDPOINTS } from './constants';

axios.defaults.baseURL = BASE_URL;

export async function getCategories() {
  const { data } = await axios.get(`${API_ENDPOINTS.CATEGORY}`);
  return data;
}
