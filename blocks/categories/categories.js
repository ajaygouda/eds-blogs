import { getCategories } from '../../scripts/utils.js';

export default async function decorate(block) {
  const categories = await getCategories(); // [{name, value}, ...]

  // Clear existing authored content
  block.innerHTML = '';

  const options = [];

  categories.forEach((cat) => {
    const el = document.createElement('p');
    el.className = 'blog__category';
    el.textContent = cat.name;
    el.dataset.value = cat.value; // slug
    el.dataset.name = cat.name; // name
    block.appendChild(el);

    // Push normalized object
    options.push({ value: cat.value, name: cat.name });
  });

  // Store normalized array for Blog JSON to consume
  block.dataset.options = JSON.stringify(options);
}
