export default function decorate(block) {
  const cardItems = [...block.children];
  block.innerHTML = '';
  const cardData = cardItems?.map((cardItem) => {
    const cols = [cardItem?.children][0];
    return {
      banner: cols[0]?.querySelector('picture'),
      title: cols[1]?.querySelector('p')?.textContent,
      desc: cols[2]?.querySelector('p'),
    };
  });
  cardData.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card__banner">${item?.banner?.outerHTML}</div>
        <div class="card__body">
          <h1 class="card__title">${item?.title}</h1>
          <button class="card__btn">View Details</buttton>
        </div>`;
    block.appendChild(card);
  });
}
