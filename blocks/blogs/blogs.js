import formatDate from '../../scripts/utils.js';

export default function decorate(block) {
  const blogsList = [...block.children];
  block.innerHTML = '';

  blogsList.forEach((blog) => {
    const cols = [...blog.children];
    const item = {
      banner: cols[0]?.querySelector('picture')?.outerHTML ?? '',
      title: cols[1]?.querySelector('p')?.textContent ?? '',
      description: cols[2]?.querySelector('p')?.textContent ?? '',
      postedDate: formatDate(cols[3]?.querySelector('p')?.textContent),
      author: cols[4]?.querySelector('p')?.textContent ?? '',
      category: cols[5]?.querySelector('p')?.textContent ?? '',
      tags: cols[6]?.querySelector('p')?.textContent ?? '',
    };

    const blogCard = document.createElement('div');
    blogCard.classList.add('blog');
    blogCard.innerHTML = `
      <div class="blog__banner">${item.banner}</div>
      <div class="blog__body">
        <p class="blog__category">${item.category}</p>
        <h1 class="blog__title">${item.title}</h1>
        <p class="blog__author-date">
          <span>${item.author}</span> | <span>${item.postedDate}</span>
        </p>
        <p class="blog__description">${item.description}</p>
        <p class="blog__tags">${item.tags}</p>
      </div>
    `;

    blogCard.addEventListener('click', () => {
      sessionStorage.setItem('blogDetail', JSON.stringify(item));
      const slug = item.title.toLowerCase().replace(/\s+/g, '-');
      window.location.href = `/blogs/blog-detail?title=${slug}`;
    });

    block.appendChild(blogCard);
  });
}
