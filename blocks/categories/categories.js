import { getCategories } from '../../scripts/utils.js';

export default async function decorate(block) {
  const categories = await getCategories(); // returns array of {name, value}

  categories.forEach((cat) => {
    // Create a proper DOM node
    const el = document.createElement('p');
    el.className = 'blog__category';
    el.textContent = cat.name; // show label
    el.dataset.slug = cat.slug; // store slug for filtering

    // Append node safely
    block.replaceChild(el, block.querySelector('div'));
  });
}
