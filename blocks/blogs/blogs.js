import formatDate from '../../scripts/utils.js';

export default function decorate(block) {
  console.log(block);
  const blogsList = [...block.children];
  console.log(blogsList);

  const blogsData = blogsList.map((blog) => {
    const cols = [...blog.children];
    return {
      banner: cols[0]?.querySelector('picture')?.outerHTML ?? '',
      title: cols[1]?.querySelector('p')?.textContent ?? '',
      description: cols[2]?.querySelector('p')?.textContent ?? '',
      postedDate: formatDate(cols[3]?.querySelector('p')?.textContent),
      author: cols[4]?.querySelector('p')?.textContent ?? '',
      category: cols[5]?.querySelector('p')?.textContent ?? '',
      tags: cols[6]?.querySelector('p')?.textContent ?? '',
    };
  });
  const fragment = document.createDocumentFragment();
  blogsData.forEach((item) => {
    const blog = document.createElement('div');
    blog.classList.add('blog');
    blog.innerHTML = `
      <div class="blog__banner">${item?.banner}</div>
      <div class="blog__body">
        <p class="blog__category">${item?.category}</p>
        <h1 class="blog__title">${item?.title}</h1>
        <p class="blog__author-date">
          <span>${item?.author}</span> | <span>${item?.postedDate}</span>
        </p>
      </div>
    `;

    blog.addEventListener('click', () => {
      sessionStorage.removeItem('blogDetail');
      sessionStorage.setItem('blogDetail', JSON.stringify({
        banner: item?.banner,
        title: item?.title,
        description: item?.description,
        postedDate: item?.postedDate,
        author: item?.author,
        tags: item?.category,
      }));
      const slug = item?.title?.toLowerCase().replace(/\s+/g, '-');
      window.location.href = `/blogs/blog-detail?title=${slug}`;
    });

    fragment.appendChild(blog);
  });
  block.replaceChildren(fragment);
}
