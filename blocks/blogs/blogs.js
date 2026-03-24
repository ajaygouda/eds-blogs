export default function decorate(block) {
  const blogsList = [...block.children];

  blogsList.forEach((blog) => {
    const cols = [...blog.children];

    blog.classList.add('blog');

    cols[0]?.classList.add('blog__banner');
    cols[1]?.classList.add('blog__title');
    cols[2]?.classList.add('blog__description');
    cols[3]?.classList.add('blog__date');
    cols[4]?.classList.add('blog__author');
    cols[5]?.classList.add('blog__category');

    blog.addEventListener('click', () => {
      const title = cols[1]?.textContent;
      const slug = title?.toLowerCase().replace(/\s+/g, '-');

      window.location.href = `/blogs/blog-detail?title=${slug}`;
    });
  });
}
