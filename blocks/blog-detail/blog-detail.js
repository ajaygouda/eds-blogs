export default function decorate(block) {
  const item = JSON.parse(sessionStorage.getItem('blogDetail'));

  if (!item) {
    block.innerHTML = '<p>Blog not found. <a href="/blogs">Go back</a></p>';
    return;
  }
  console.log(block);
}
