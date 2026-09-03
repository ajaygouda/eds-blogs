function showSlide(slides, index) {
  slides.forEach((slide, slideIndex) => {
    slide.style.display = slideIndex === index ? 'block' : 'none';
  });
}

export default function decorate(block) {
  const slides = block.querySelectorAll('.slide');
  const variant = block.dataset.styleVariant || 'hero';
  const autoplay = block.dataset.autoplay === 'true';

  block.classList.add(`carousel-${variant}`);

  if (autoplay) {
    let index = 0;
    showSlide(slides, index);
    setInterval(() => {
      index = (index + 1) % slides.length;
      showSlide(slides, index);
    }, 3000);
  }
}
