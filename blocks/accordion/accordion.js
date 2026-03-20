export default function decorate(block) {
  const accordionItems = [...block.children];
  block.innerHTML = '';
  const accordionData = accordionItems.map((accItem) => {
    const cols = [...accItem.children];
    return {
      question: cols[0]?.querySelector('p')?.textContent,
      answer: cols[1]?.querySelector('p')?.textContent,
    };
  });
  const accordion = document.createElement('div');
  accordion.classList.add('accordion');
  block.classList.add(`accordion__${accordionData[0]?.question}`);
  accordionData.filter((item, i) => i !== 0).forEach((accitem) => {
    const accordionItem = document.createElement('div');
    accordionItem.classList.add('accordion__item');
    accordionItem.innerHTML = `
         <div class="accordion__item-header">
            ${accitem?.question}
            <span><svg aria-hidden="true" class="svg-icon iconArrowDownAlt" width="18" height="18" viewBox="0 0 18 18"><path d="m16.01 7.43-1.4-1.41L9 11.6 3.42 6l-1.4 1.42 7 7z"></path></svg></span>
         </div>
         <div class="accordion__item-content">
            ${accitem?.answer}
         </div>`;
    block.appendChild(accordionItem);
  });

  const items = document.querySelectorAll('.accordion__item');
  const activate = (index) => {
    const isActive = items[index].classList.contains('accordion__item--active');
    items.forEach((item) => item.classList.remove('accordion__item--active'));
    if (!isActive) {
      items[index].classList.add('accordion__item--active');
    }
  };

  items.forEach((item, i) => {
    const cols = [...item.children];
    cols[0].addEventListener('click', () => {
      activate(i);
    });
  });
}
