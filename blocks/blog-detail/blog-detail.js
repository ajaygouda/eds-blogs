import { getSession } from '../../scripts/utils.js';

export default function decorate(block) {
  const item = getSession('blogDetail');

  if (!item) {
    block.innerHTML = '<p>Blog not found. <a href="/blogs">Go back</a></p>';
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'blog-detail__inner';

  const banner = document.createElement('div');
  banner.className = 'blog-detail__banner';
  banner.innerHTML = item.banner;

  const body = document.createElement('div');
  body.className = 'blog-detail__body';

  const category = document.createElement('p');
  category.className = 'blog-detail__tags';
  category.textContent = item.category;

  const title = document.createElement('h1');
  title.className = 'blog-detail__title';
  title.textContent = item.title;

  const authorDate = document.createElement('p');
  authorDate.className = 'blog-detail__author-date';
  authorDate.textContent = `${item.author} | ${item.date}`;

  const desc = document.createElement('div');
  desc.className = 'blog-detail__description';
  desc.textContent = item.description;

  body.append(category, title, authorDate, desc);
  wrapper.append(banner, body);

  block.append(wrapper);
}
