import refs from './refs';

export function renderCategories(categories) {
  const allCategories = ['all', ...categories];
  const categoriesMarkup = allCategories
    .map(
      category => `<li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
 </li>`
    )
    .join('');

  refs.categoryList.insertAdjacentHTML('beforeend', categoriesMarkup);
}
