//Логіка сторінки Wishlist

import { getProductsByIds } from './js/products-api';
import {
  clearList,
  hideNotFound,
  renderProducts,
  showNotFound,
} from './js/render-function';
import { hideLoader, initScrollTop, initThemeToggle, showLoader, showToast } from './js/helpers';
import { getStoredIds, updateNavCounts } from './js/storage';
import { initModal } from './js/modal';
import { handleProductClick } from './js/handlers';
import refs from './js/refs';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollTop();
  initModal();
  updateNavCounts();
  refs.productsList?.addEventListener('click', handleProductClick);
  window.addEventListener('storage:update', handleStorageUpdate);
  renderWishlistItems();
});

async function renderWishlistItems() {
  const ids = getStoredIds('wishlist');
  clearList();
  hideNotFound();

  if (ids.length === 0) {
    showNotFound();
    return;
  }

  showLoader();
  try {
    const products = await getProductsByIds(ids);
    renderProducts(products);
  } catch (error) {
    console.log(error);
    showToast('Something went wrong...', 'error');
  } finally {
    hideLoader();
  }
}

function handleStorageUpdate(event) {
  if (event.detail?.key === 'wishlist') {
    renderWishlistItems();
  }
}
