import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import refs from './refs';

const THEME_KEY = 'theme';
let loaderCount = 0;
let loaderElement = null;

export function showToast(message, type = 'success') {
  const options = {
    message,
    position: 'topRight',
    timeout: 5000,
  };

  switch (type) {
    case 'success':
      iziToast.success(options);
      break;
    case 'error':
      iziToast.error(options);
      break;
    case 'warning':
      iziToast.warning(options);
      break;
    case 'info':
      iziToast.info(options);
      break;
    default:
      iziToast.error({
        message: `Invalid type of toast: ${type}`,
        position: 'topRight',
        timeout: 5000,
      });
      break;
  }
}

function ensureLoader() {
  if (loaderElement) return;
  loaderElement = document.querySelector('.page-loader');
  if (!loaderElement) {
    loaderElement = document.createElement('div');
    loaderElement.className = 'page-loader';
    loaderElement.innerHTML = '<div class="page-loader__spinner"></div>';
    document.body.appendChild(loaderElement);
  }
}

function updateLoaderVisibility() {
  if (!loaderElement) return;
  loaderElement.classList.toggle('page-loader--visible', loaderCount > 0);
}

export function showLoader() {
  ensureLoader();
  loaderCount += 1;
  updateLoaderVisibility();
}

export function hideLoader() {
  loaderCount = Math.max(0, loaderCount - 1);
  updateLoaderVisibility();
}

export function initThemeToggle() {
  if (!refs.themeToggleBtn) return;
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);
  refs.themeToggleBtn.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

function applyTheme(theme) {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  updateThemeToggleLabel(nextTheme);
}

function updateThemeToggleLabel(theme) {
  if (!refs.themeToggleBtn) return;
  const isDark = theme === 'dark';
  refs.themeToggleBtn.textContent = isDark ? 'L' : 'D';
  refs.themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  refs.themeToggleBtn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
}

export function initScrollTop() {
  if (!refs.scrollTopBtn) return;
  const toggleScrollButton = () => {
    refs.scrollTopBtn.classList.toggle('scroll-top-btn--visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', toggleScrollButton);
  refs.scrollTopBtn.addEventListener('click', () => {
    if (refs.productsList) {
      refs.productsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  toggleScrollButton();
}
