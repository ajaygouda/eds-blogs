export function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString.split('T')[0]);

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function extractWraperDiv(data, elementName, className) {
  const el = data?.querySelector(elementName);
  if (el && className) el.classList.add(className);
  return el;
}

export function getSession(key) {
  const value = sessionStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

// Parsed data from the plain HTML blogs page to JSON format.
export function parsePlainHtmlToJson(htmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  const blogRows = [...(doc.querySelector('.blogs')?.children || [])];
  if (blogRows.length) {
    return blogRows.map((row) => {
      const columns = [...row.children];
      return {
        banner: columns[0]?.querySelector('picture')?.outerHTML || '',
        title: columns[1]?.textContent?.trim() || '',
        description: columns[2]?.textContent?.trim() || '',
        date: columns[3]?.textContent?.trim() || '',
        author: columns[4]?.textContent?.trim() || '',
        category: columns[5]?.textContent?.trim() || '',
        tags: columns[6]?.textContent?.trim() || '',
      };
    });
  }

  return [];
}

export function setSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export async function getBlogsData() {
  if (window.blogsData) return window.blogsData;

  const response = await fetch('/blogs.plain.html');
  const html = await response.text();
  const blogs = parsePlainHtmlToJson(html);
  return blogs;
}
