import refs from './refs';

export function renderCategories(categories) {
  const allCategories = ['all', ...categories];
  const categoriesMarkup = allCategories
    .map(
      category => `<li class="categories__item">
   <button class="categories__btn" type="button" data-category="${category}">${category}</button>
 </li>`
    )
    .join('');
  
  refs.categoryList.insertAdjacentHTML('beforeend', categoriesMarkup);

  if(document.querySelector('.categories__btn')){
    document.querySelector('.categories__btn').classList.add('categories__btn--active');
  }
}

export function renderProducts(products) {
  const productsMarkup = products.map(({id, thumbnail, title, brand, price, category}) => 
    `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price}$</p>
 </li>
`
  ).join('')
  refs.productsList.insertAdjacentHTML('beforeend', productsMarkup);
}

export function clearList() {
  refs.productsList.innerHTML = '';
}

export function showNotFound() {
  refs.notFound.classList.add('not-found--visible');
}