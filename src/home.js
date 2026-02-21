//Логіка сторінки Home

import { initHomePage } from './js/handlers';
import { initModal } from './js/modal';
import { initScrollTop, initThemeToggle } from './js/helpers';
import { updateNavCounts } from './js/storage';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollTop();
  initModal();
  updateNavCounts();
  initHomePage();
});
