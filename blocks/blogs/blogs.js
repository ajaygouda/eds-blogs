export default function decorate(block) {
  const blogsList = [...block.children];

  blogsList.forEach((blog) => {
    const cols = [...blog.children];

    // Create wrappers
    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('blog__banner');

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('blog__content');

    // Move existing elements (IMPORTANT)
    if (cols[0]) bannerWrapper.appendChild(cols[0]); // image
    if (cols[1]) contentWrapper.appendChild(cols[1]); // title
    if (cols[2]) contentWrapper.appendChild(cols[2]); // description
    if (cols[3]) contentWrapper.appendChild(cols[3]); // date
    if (cols[4]) contentWrapper.appendChild(cols[4]); // author
    if (cols[5]) contentWrapper.appendChild(cols[5]); // category

    // Clear blog row
    blog.innerHTML = '';

    // Append structured layout
    blog.appendChild(bannerWrapper);
    blog.appendChild(contentWrapper);

    // Add class
    blog.classList.add('blog');
  });
}
