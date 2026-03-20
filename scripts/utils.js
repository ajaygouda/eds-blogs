function formatDate(dateString) {
  if (!dateString) return '';

  const date = new Date(dateString.split('T')[0]);

  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export default formatDate;
