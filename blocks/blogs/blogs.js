import formatDate from '../../scripts/utils.js';

export default function decorate(block) {
  const blogsList = [...block.children];
  block.innerHTML = '';

  const blogsData = blogsList.map((blog) => {
    const cols = [...blog.children];
    return {
      banner: cols[0]?.querySelector('picture'),
      title: cols[1]?.querySelector('p')?.textContent,
      description: cols[2]?.querySelector('p')?.textContent,
      postedDate: formatDate(cols[3]?.querySelector('p')?.textContent),
      author: cols[4]?.querySelector('p')?.textContent,
      category: cols[5]?.querySelector('p')?.textContent,
    };
  });

  blogsData.forEach((item) => {
    const blog = document.createElement('div');
    blog.classList.add('blog');
    blog.innerHTML = `
      <div class="blog__banner">${item?.banner?.outerHTML ?? ''}</div>
      <div class="blog__body">
        <p class="blog__category">${item?.category ?? ''}</p>
        <h1 class="blog__title">${item?.title ?? ''}</h1>
        <p class="blog__author-date">
          <span>${item?.author ?? ''}</span> | <span>${item?.postedDate}</span>
        </p>
      </div>
    `;
    blog.addEventListener('click', () => {
      sessionStorage.setItem('blogBanner', item?.banner ?? '');

      const params = new URLSearchParams({
        title: item?.title ?? '',
        description: item?.description ?? '',
        postedDate: item?.postedDate ?? '',
        author: item?.author ?? '',
        tags: item?.tags ?? '',
      });
      window.location.href = `/blogs/blog-detail?${params}`;
    });
    block.appendChild(blog);
  });
}
