import { getCategories } from './products-api';
import { renderCategories } from './render-function';

export async function handleInitHome() {
  try {
    const categories = await getCategories();
    renderCategories(categories);
  } catch (error) {
    console.log(error);
  }
}
