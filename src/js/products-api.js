import axios from 'axios';

import { BASE_URL, API_ENDPOINTS, ITEMS_PER_PAGE } from './constants';

axios.defaults.baseURL = BASE_URL;

export async function getCategories() {
  const { data } = await axios.get(`${API_ENDPOINTS.CATEGORY}`);
  return data;
}


export async function getProducts(currentPage) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const { data } = await axios.get(`${API_ENDPOINTS.PRODUCTS}?limit=${ITEMS_PER_PAGE}&skip=${skip}`);
  return data;
}

export async function getProductsByCategory(currentPage, nameCategory) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const encodedCategory = encodeURIComponent(nameCategory);
  const { data } = await axios.get(`${API_ENDPOINTS.PRODUCTS_BY_CATEGORY}${encodedCategory}?limit=${ITEMS_PER_PAGE}&skip=${skip}`);
  return data;
}

export async function getProductById(id) {
  const { data } = await axios.get(`${API_ENDPOINTS.PRODUCT_BY_ID}${id}`);
  return data;
}

export async function searchProducts(currentPage, query) {
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const { data } = await axios.get(API_ENDPOINTS.SEARCH, {
    params: {
      q: query,
      limit: ITEMS_PER_PAGE,
      skip,
    },
  });
  return data;
}

export async function getProductsByIds(ids) {
  const requests = ids.map(id => getProductById(id));
  return Promise.all(requests);
}
