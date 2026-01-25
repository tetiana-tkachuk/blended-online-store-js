import axios from 'axios';
import { getCategories, getProducts, getProductsByCategory } from './products-api';
import { renderCategories, renderProducts, clearList, showNotFound } from './render-function';
import { showToast } from './helpers';
import refs from './refs';

let currentPage = 1;
export async function handleInitHome() {
  try {
    const categories = await getCategories();
    const {total, products} = await getProducts(currentPage);
    renderProducts(products);
    renderCategories(categories);
  } catch (error) {
    console.log(error);
    showToast('Something went wrong...', 'error');
  }
}

export async function handleClickByCategory(event) {
  if (event.target.nodeName !== 'BUTTON') return;
  
  clearList();
  
  const nameCategory = event.target.dataset.category;
  if (nameCategory === 'all') {
    try {
       const {total, products} = await getProducts(currentPage);
       renderProducts(products);
    }
    catch (error) {
    console.log(error);
    showToast('Something went wrong...', 'error');
  }
  }
  document.querySelectorAll('.categories__btn').forEach(button => {
    if (button.classList.contains('categories__btn--active')){
      button.classList.remove('categories__btn--active');
    }
  })
  event.target.classList.add('categories__btn--active');
    try {
      const { total, products } = await getProductsByCategory(currentPage, nameCategory);
      if (products.length !== 0) {
        renderProducts(products);
      }
      else {
        showNotFound();
        return;
      }
    } catch (error) {
      console.log(error);
      showToast('Something went wrong...', 'error');
    }
}