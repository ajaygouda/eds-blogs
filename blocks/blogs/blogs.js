import formatDate from '../../scripts/utils.js';

export default function decorate(block) {
  const blogsList = [...block.children];
  console.log(blogsList);

  const blogData = blogsList.map((blog) => {
    const cols = [...blog.children];
    console.log(cols[0]);
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
  console.log('blogData', blogData);
}
