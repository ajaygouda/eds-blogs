import { formatDate, extractWraperDiv } from '../../scripts/utils.js';

export default function decorate(block) {
  const blogsList = [...block.children];

  blogsList.forEach((blog) => {
    const cols = [...blog.children];

    const data = {
      banner: cols[0]?.querySelector('picture')?.outerHTML || '',
      title: cols[1]?.textContent?.trim() || '',
      description: cols[2]?.textContent?.trim() || '',
      date: formatDate(cols[3]?.textContent?.trim()),
      author: cols[4]?.textContent?.trim() || '',
      category: cols[5]?.textContent?.trim() || '',
      tags: cols[6]?.textContent?.trim() || '',
    };

    // Create wrappers
    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('blog__banner');

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('blog__content');

    const authorDate = document.createElement('div');
    authorDate.classList.add('blog__author-date');

    // Move existing elements (IMPORTANT)
    if (cols[0]) bannerWrapper.appendChild(extractWraperDiv(cols[0], 'picture')); // image
    if (cols[1]) contentWrapper.appendChild(extractWraperDiv(cols[1], 'p', 'blog__title')); // title
    if (cols[3]) {
      const dateEl = extractWraperDiv(cols[3], 'p', 'blog__date');
      dateEl.textContent = formatDate(dateEl.textContent);
      authorDate.appendChild(dateEl);
    } // date
    if (cols[4]) authorDate.appendChild(extractWraperDiv(cols[4], 'p', 'blog__author')); // author
    if (cols[5]) bannerWrapper.appendChild(extractWraperDiv(cols[5], 'p', 'blog__category')); // category

    // Clear blog row
    blog.innerHTML = '';

    // Append structured layout
    blog.appendChild(bannerWrapper);
    contentWrapper.appendChild(authorDate);
    blog.appendChild(contentWrapper);
    console.log('data', data);

    blog.classList.add('blog');
    blog.addEventListener('click', () => {
      sessionStorage.removeItem('blogDetail');
      sessionStorage.setItem('blogDetail', JSON.stringify(data));
      const slug = data?.title?.toLowerCase().replace(/\s+/g, '-');
      window.location.href = `/blog/blog-detail?title=${slug}`;
    });
  });
}
