import formatDate from '../../scripts/utils.js';

export default function decorate(block) {
  const item = JSON.parse(sessionStorage.getItem('blogDetail'));

  if (!item) {
    block.innerHTML = '<p>Blog not found. <a href="/blogs">Go back</a></p>';
    return;
  }

  block.innerHTML = `
    <div class="blog-detail__inner">
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
