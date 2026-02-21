import refs from './refs';

export function renderCategories(categories) {
  const allCategories = ['All', ...categories];
  const categoriesMarkup = allCategories
    .map(
      category => `<li class="categories__item">
   <button class="categories__btn" type="button" data-category="${category === 'All' ? 'all' : category}">${category}</button>
 </li>`
    )
    .join('');

  refs.categoryList.innerHTML = categoriesMarkup;

  const firstButton = refs.categoryList.querySelector('.categories__btn');
  if (firstButton) {
    firstButton.classList.add('categories__btn--active');
  }
}

export function renderProducts(products) {
  const productsMarkup = products
    .map(
      ({ id, thumbnail, title, brand, price, category }) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:</span> ${brand || 'Unknown'}</p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: $${price}</p>
 </li>
`
    )
    .join('');
  refs.productsList.insertAdjacentHTML('beforeend', productsMarkup);
}

export function clearList() {
  refs.productsList.innerHTML = '';
}

export function showNotFound() {
  refs.notFound.classList.add('not-found--visible');
}

export function hideNotFound() {
  refs.notFound.classList.remove('not-found--visible');
}

export function renderModalProduct(product) {
  const tags = Array.isArray(product.tags) && product.tags.length > 0
    ? product.tags
    : [product.category, product.brand].filter(Boolean);
  const tagsMarkup = tags.map(tag => `<li>${tag}</li>`).join('');
  const image = product.thumbnail || (product.images && product.images[0]) || '';
  const shippingInfo = product.shippingInformation || 'Free worldwide shipping';
  const returnPolicy = product.returnPolicy || '30-day return policy';

  return `
    <img class="modal-product__img" src="${image}" alt="${product.title || 'Product'}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${product.title || ''}</p>
        <ul class="modal-product__tags">${tagsMarkup}</ul>
        <p class="modal-product__description">${product.description || ''}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInfo}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: $${product.price}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
  `;
}
