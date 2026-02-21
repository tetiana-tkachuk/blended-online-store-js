import {
  getCategories,
  getProductById,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from './products-api';
import {
  renderCategories,
  renderProducts,
  clearList,
  showNotFound,
  hideNotFound,
} from './render-function';
import { hideLoader, showLoader, showToast } from './helpers';
import refs from './refs';
import { ITEMS_PER_PAGE } from './constants';
import { openModalWithProduct } from './modal';

const state = {
  currentPage: 1,
  totalItems: 0,
  activeMode: 'all',
  activeCategory: 'all',
  searchQuery: '',
};

export function initHomePage() {
  if (!refs.productsList) return;
  refs.categoryList?.addEventListener('click', handleClickByCategory);
  refs.loadMoreBtn?.addEventListener('click', handleLoadMore);
  refs.searchForm?.addEventListener('submit', handleSearchSubmit);
  refs.searchClearBtn?.addEventListener('click', handleSearchClear);
  refs.productsList?.addEventListener('click', handleProductClick);
  handleInitHome();
}

async function handleInitHome() {
  state.currentPage = 1;
  state.activeMode = 'all';
  state.activeCategory = 'all';
  state.searchQuery = '';
  showLoader();
  try {
    const [categories, data] = await Promise.all([
      getCategories(),
      getProducts(state.currentPage),
    ]);
    renderCategories(categories);
    clearList();
    hideNotFound();
    renderProducts(data.products);
    state.totalItems = data.total || 0;
    updateLoadMoreVisibility();
  } catch (error) {
    console.log(error);
    showToast('Something went wrong...', 'error');
  } finally {
    hideLoader();
  }
}

async function handleClickByCategory(event) {
  const button = event.target.closest('.categories__btn');
  if (!button) return;
  const categoryText = button.textContent.trim();
  const category = categoryText.toLowerCase() === 'all' ? 'all' : categoryText;

  setActiveCategoryButton(button);
  state.activeCategory = category === 'all' ? 'all' : category;
  state.activeMode = state.activeCategory === 'all' ? 'all' : 'category';
  state.searchQuery = '';
  state.currentPage = 1;

  await fetchAndRenderProducts();
}

async function handleSearchSubmit(event) {
  event.preventDefault();
  if (!refs.searchInput) return;
  const query = refs.searchInput.value.trim();
  if (!query) return;

  state.searchQuery = query;
  state.activeMode = 'search';
  state.activeCategory = 'all';
  state.currentPage = 1;
  setActiveCategoryByValue('all');

  await fetchAndRenderProducts();
}

async function handleSearchClear() {
  if (!refs.searchInput) return;
  refs.searchInput.value = '';
  state.searchQuery = '';
  state.activeMode = 'all';
  state.activeCategory = 'all';
  state.currentPage = 1;
  setActiveCategoryByValue('all');

  await fetchAndRenderProducts();
}

async function handleLoadMore() {
  if (!refs.loadMoreBtn) return;
  state.currentPage += 1;
  refs.loadMoreBtn.classList.add('is-loading');
  showLoader();
  try {
    const data = await fetchProductsByMode(state.currentPage);
    if (data.products.length === 0) {
      updateLoadMoreVisibility();
      return;
    }
    renderProducts(data.products);
    state.totalItems = data.total || state.totalItems;
    updateLoadMoreVisibility();
  } catch (error) {
    state.currentPage = Math.max(1, state.currentPage - 1);
    console.log(error);
    showToast('Something went wrong...', 'error');
  } finally {
    refs.loadMoreBtn.classList.remove('is-loading');
    hideLoader();
  }
}

export async function handleProductClick(event) {
  const item = event.target.closest('.products__item');
  if (!item) return;
  const productId = Number(item.dataset.id);
  if (!productId) return;

  showLoader();
  try {
    const product = await getProductById(productId);
    openModalWithProduct(product);
  } catch (error) {
    console.log(error);
    showToast('Something went wrong...', 'error');
  } finally {
    hideLoader();
  }
}

async function fetchAndRenderProducts() {
  clearList();
  hideNotFound();
  updateLoadMoreVisibility(true);
  showLoader();
  try {
    const data = await fetchProductsByMode(state.currentPage);
    state.totalItems = data.total || 0;
    if (data.products.length === 0) {
      showNotFound();
      updateLoadMoreVisibility();
      return;
    }
    renderProducts(data.products);
    updateLoadMoreVisibility();
  } catch (error) {
    console.log(error);
    showToast('Something went wrong...', 'error');
  } finally {
    hideLoader();
  }
}

function fetchProductsByMode(page) {
  if (state.activeMode === 'search') {
    return searchProducts(page, state.searchQuery);
  }
  if (state.activeMode === 'category' && state.activeCategory !== 'all') {
    return getProductsByCategory(page, state.activeCategory);
  }
  return getProducts(page);
}

function updateLoadMoreVisibility(forceHide = false) {
  if (!refs.loadMoreBtn) return;
  if (forceHide) {
    refs.loadMoreBtn.classList.add('is-hidden');
    return;
  }
  const isLastPage = state.currentPage * ITEMS_PER_PAGE >= state.totalItems;
  refs.loadMoreBtn.classList.toggle('is-hidden', isLastPage || state.totalItems === 0);
}

function setActiveCategoryButton(activeButton) {
  document.querySelectorAll('.categories__btn').forEach(button => {
    button.classList.toggle('categories__btn--active', button === activeButton);
  });
}

function setActiveCategoryByValue(value) {
  const button = document.querySelector(`.categories__btn[data-category="${value}"]`);
  if (button) {
    setActiveCategoryButton(button);
  }
}
