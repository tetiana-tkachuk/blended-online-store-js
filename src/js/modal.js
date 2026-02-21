import refs from './refs';
import { renderModalProduct } from './render-function';
import { isInStorage, toggleInStorage } from './storage';

let activeProductId = null;

export function initModal() {
  if (!refs.modal) return;
  refs.modalCloseBtn?.addEventListener('click', closeModal);
  refs.modal.addEventListener('click', handleBackdropClick);
  document.addEventListener('keydown', handleEscape);
  refs.modalCartBtn?.addEventListener('click', () => handleToggle('cart'));
  refs.modalWishlistBtn?.addEventListener('click', () => handleToggle('wishlist'));
}

export function openModalWithProduct(product) {
  if (!refs.modal || !refs.modalProduct) return;
  activeProductId = product.id;
  refs.modalProduct.innerHTML = renderModalProduct(product);
  updateActionButtons();
  refs.modal.classList.add('modal--is-open');
}

export function closeModal() {
  if (!refs.modal) return;
  refs.modal.classList.remove('modal--is-open');
  if (refs.modalProduct) {
    refs.modalProduct.innerHTML = '';
  }
  activeProductId = null;
}

function handleBackdropClick(event) {
  if (event.target === refs.modal) {
    closeModal();
  }
}

function handleEscape(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

function handleToggle(key) {
  if (!activeProductId) return;
  toggleInStorage(key, activeProductId);
  updateActionButtons();
}

function updateActionButtons() {
  if (!activeProductId) return;
  if (refs.modalCartBtn) {
    refs.modalCartBtn.textContent = isInStorage('cart', activeProductId)
      ? 'Remove from Cart'
      : 'Add to Cart';
  }
  if (refs.modalWishlistBtn) {
    refs.modalWishlistBtn.textContent = isInStorage('wishlist', activeProductId)
      ? 'Remove from Wishlist'
      : 'Add to Wishlist';
  }
}
