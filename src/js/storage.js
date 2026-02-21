import refs from './refs';

const STORAGE_KEYS = {
  cart: 'cart',
  wishlist: 'wishlist',
};

export function getStoredIds(key) {
  const storageKey = STORAGE_KEYS[key] || key;
  const raw = localStorage.getItem(storageKey);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(id => Number(id))
      .filter(id => Number.isFinite(id));
  } catch (error) {
    return [];
  }
}

export function saveStoredIds(key, ids) {
  const storageKey = STORAGE_KEYS[key] || key;
  localStorage.setItem(storageKey, JSON.stringify(ids));
}

export function isInStorage(key, id) {
  const ids = getStoredIds(key);
  return ids.includes(Number(id));
}

export function addToStorage(key, id) {
  const ids = getStoredIds(key);
  const numericId = Number(id);
  if (!ids.includes(numericId)) {
    ids.push(numericId);
    saveStoredIds(key, ids);
  }
  updateNavCounts();
  emitStorageUpdate(key, ids);
  return ids;
}

export function removeFromStorage(key, id) {
  const numericId = Number(id);
  const ids = getStoredIds(key).filter(itemId => itemId !== numericId);
  saveStoredIds(key, ids);
  updateNavCounts();
  emitStorageUpdate(key, ids);
  return ids;
}

export function toggleInStorage(key, id) {
  const numericId = Number(id);
  const exists = isInStorage(key, numericId);
  const ids = exists ? removeFromStorage(key, numericId) : addToStorage(key, numericId);
  return { added: !exists, ids };
}

export function updateNavCounts() {
  if (refs.cartCount) {
    refs.cartCount.textContent = String(getStoredIds('cart').length);
  }
  if (refs.wishlistCount) {
    refs.wishlistCount.textContent = String(getStoredIds('wishlist').length);
  }
}

function emitStorageUpdate(key, ids) {
  window.dispatchEvent(
    new CustomEvent('storage:update', {
      detail: { key, ids },
    })
  );
}
