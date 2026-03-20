import formatDate from '../../scripts/utils.js';

export default function decorate(block) {
  console.log('✅ blog-detail block loaded');
  console.log('URL:', window.location.href);
  console.log('search:', window.location.search);

  const params = new URLSearchParams(window.location.search);
  console.log('all params:', Object.fromEntries(params));

  const item = {
    banner: params.get('banner') ?? '',
    title: params.get('title') ?? '',
    description: params.get('description') ?? '',
    postedDate: params.get('postedDate') ?? '',
    author: params.get('author') ?? '',
    tags: params.get('tags') ?? '',
  };

  if (!item.title) {
    block.innerHTML = '<p>Blog not found.</p>';
    return;
  }

  block.innerHTML = `
    <div class="blog-detail">
      <div class="blog-detail__banner">${item.banner}</div>
      <div class="blog-detail__body">
        <p class="blog-detail__tags">${item.tags}</p>
        <h1 class="blog-detail__title">${item.title}</h1>
        <p class="blog-detail__author-date">
          <span>${item.author}</span> | <span>${formatDate(item.postedDate)}</span>
        </p>
        <div class="blog-detail__description">${item.description}</div>
      </div>
    </div>
  `;
}
