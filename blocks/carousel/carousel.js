export default function decorate(block) {
    const slideItems = [...block.children];
    let currentIndex = 0;

    const slidesHTML = slideItems.map((slide, i) => {
        const image = slide.querySelector('img');
        const title = slide.querySelector('h1, h2, h3');
        const desc = slide.querySelector('p');
        const link = slide.querySelector('a');

        return `
      <div class="carousel__slide ${i === 0 ? 'active' : ''}" data-index="${i}">
        ${image ? `
          <div class="carousel__image">
            <img src="${image.src}" alt="${image.alt || ''}" loading="${i === 0 ? 'eager' : 'lazy'}"/>
          </div>` : ''}
        <div class="carousel__content">
          ${title ? `<h2 class="carousel__title">${title.textContent}</h2>` : ''}
          ${desc ? `<p class="carousel__desc">${desc.textContent}</p>` : ''}
          ${link ? `<a href="${link.href}" class="carousel__cta">${link.textContent}</a>` : ''}
        </div>
      </div>
    `;
    }).join('');

    const dotsHTML = slideItems.map((_, i) => `
    <button class="carousel__dot ${i === 0 ? 'active' : ''}" aria-label="Go to slide ${i + 1}" data-index="${i}"></button>
  `).join('');

    block.innerHTML = `
    <div class="carousel__wrapper">
      <div class="carousel__slides">${slidesHTML}</div>
      <button class="carousel__btn carousel__btn--prev" aria-label="Previous slide">&#8249;</button>
      <button class="carousel__btn carousel__btn--next" aria-label="Next slide">&#8250;</button>
      <div class="carousel__dots">${dotsHTML}</div>
    </div>
  `;

    const slides = block.querySelectorAll('.carousel__slide');
    const dots = block.querySelectorAll('.carousel__dot');
    const prevBtn = block.querySelector('.carousel__btn--prev');
    const nextBtn = block.querySelector('.carousel__btn--next');

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        currentIndex = (index + slides.length) % slides.length;
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    dots.forEach((dot, i) => {
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