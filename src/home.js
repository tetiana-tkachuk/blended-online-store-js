//Логіка сторінки Home

import { handleInitHome, handleClickByCategory } from './js/handlers';
import refs from './js/refs';

document.addEventListener('DOMContentLoaded', handleInitHome);
refs.categoryList.addEventListener('click', handleClickByCategory);
