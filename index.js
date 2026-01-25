import"./assets/styles-JE8YjOlG.js";import{a as e}from"./assets/vendor-N5iQpiFS.js";const a="https://dummyjson.com",c={PRODUCTS:"/products",PRODUCT_BY_ID:"/products/",SEARCH:"/products/search",CATEGORY:"/products/category-list",PRODUCTS_BY_CATEGORY:"/products/category/"};e.defaults.baseURL=a;async function r(){const{data:t}=await e.get(`${c.CATEGORY}`);return t}const n={categoryList:document.querySelector(".categories")};function i(t){const o=["all",...t].map(s=>`<li class="categories__item">
   <button class="categories__btn" type="button">${s}</button>
 </li>`).join("");n.categoryList.insertAdjacentHTML("beforeend",o)}async function d(){try{const t=await r();i(t)}catch(t){console.log(t)}}document.addEventListener("DOMContentLoaded",d);
//# sourceMappingURL=index.js.map
