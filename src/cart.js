//Логіка сторінки Cart

import { getProductsByIds } from './js/products-api';
import {
  clearList,
  hideNotFound,
  renderProducts,
  showNotFound,
} from './js/render-function';
import {
  hideLoader,
  initScrollTop,
  initThemeToggle,
  showLoader,
  showToast,
} from './js/helpers';
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
  refs.cartSummaryButton?.addEventListener('click', handlePurchase);
  window.addEventListener('storage:update', handleStorageUpdate);
  renderCartItems();
});

async function renderCartItems() {
  const ids = getStoredIds('cart');
  clearList();
  hideNotFound();
  updateCartSummary([]);

  if (ids.length === 0) {
    showNotFound();
    return;
  }

  showLoader();
  try {
    const products = await getProductsByIds(ids);
    renderProducts(products);
    updateCartSummary(products);
  } catch (error) {
    console.log(error);
    showToast('Something went wrong...', 'error');
  } finally {
    hideLoader();
  }
}

function updateCartSummary(products) {
  if (!refs.cartSummaryCount || !refs.cartSummaryPrice) return;
  const itemsCount = products.length;
  const totalPrice = products.reduce(
    (sum, product) => sum + (product.price || 0),
    0
  );
  refs.cartSummaryCount.textContent = String(itemsCount);
  refs.cartSummaryPrice.textContent = `$${totalPrice}`;
}

function handlePurchase() {
  const ids = getStoredIds('cart');
  if (ids.length === 0) {
    showToast('Your cart is empty', 'warning');
    return;
  }
  showToast('Purchase successful', 'success');
}

function handleStorageUpdate(event) {
  if (event.detail?.key === 'cart') {
    renderCartItems();
  }
}
