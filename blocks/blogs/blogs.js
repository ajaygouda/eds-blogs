export default function decorate(block) {
  console.log(block);
  const blogsList = [...block.children];
  block.innerHTML = '';

  const blogsData = blogsList.map((blog) => {
    const cols = [...blog.children];
    return {
      banner: cols[0]?.querySelector('picture'),
      title: cols[1]?.querySelector('p')?.textContent,
      description: cols[2]?.querySelector('p')?.textContent,
      postedDate: '',
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
    block.appendChild(blog);
  });
}
