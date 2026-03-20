export default function decorate(block) {
  const slides = [...block.children];
  const slideData = slides.map((slide) => {
    const cols = [...slide.children];
    return {
      title: cols[0]?.querySelector('p')?.textContent,
      description: cols[1]?.querySelector('p')?.textContent,
      banner: cols[2]?.querySelector('picture'),
      ctaTitle: cols[3]?.querySelector('p')?.textContent,
    };
  });
  block.innerHTML = '';
  const carousel = document.createElement('div');
  carousel.classList.add('carousel__inner');
  slideData.forEach((data, i) => {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel__item');
    if (i === 0) carouselItem.classList.add('carousel__item--active');
    carouselItem.innerHTML = `
      ${data.banner ? `<div class="carousel__item-image">${data.banner.outerHTML}</div>` : ''}
      <div class="carousel__item-content">
        ${data.title ? `<h2 class="carousel__item-title">${data.title}</h2>` : ''}
        ${data.description ? `<p class="carousel__item-desc">${data.description}</p>` : ''}
        ${data.ctaTitle ? `<a class="carousel__item-cta">${data.ctaTitle}</a>` : ''}
      </div>
    `;
    carousel.appendChild(carouselItem);
  });
  const leftBtn = document.createElement('button');
  leftBtn.classList.add('carousel__control', 'carousel__control--left');
  leftBtn.setAttribute('aria-label', 'Previous slide');
  leftBtn.innerHTML = '&#8249;';

  const rightBtn = document.createElement('button');
  rightBtn.classList.add('carousel__control', 'carousel__control--right');
  rightBtn.setAttribute('aria-label', 'Next slide');
  rightBtn.innerHTML = '&#8250;';

  const dots = document.createElement('div');
  dots.classList.add('carousel__dots');

  slideData.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel__dot');
    if (i === 0) dot.classList.add('carousel__dot--active');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.dataset.index = i;
    dots.appendChild(dot);
  });

  block.appendChild(carousel);
  block.appendChild(leftBtn);
  block.appendChild(rightBtn);
  block.appendChild(dots);

  let currentIndex = 0;
  const items = carousel.querySelectorAll('.carousel__item');
  const dotBtns = dots.querySelectorAll('.carousel__dot');
  function goToSlide(index) {
    items[currentIndex].classList.remove('carousel__item--active');
    dotBtns[currentIndex].classList.remove('carousel__dot--active');
    currentIndex = (index + items.length) % items.length;
    items[currentIndex].classList.add('carousel__item--active');
    dotBtns[currentIndex].classList.add('carousel__dot--active');
  }
  leftBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  rightBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  dotBtns.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });
  let timer = setInterval(() => goToSlide(currentIndex + 1), 5000);
  block.addEventListener('mouseenter', () => clearInterval(timer));
  block.addEventListener('mouseleave', () => {
    timer = setInterval(() => goToSlide(currentIndex + 1), 5000);
  });
  block.setAttribute('tabindex', '0');
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
  });
}

