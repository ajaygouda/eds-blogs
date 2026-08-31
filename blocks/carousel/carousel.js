export default function decorate(block) {
  // 1. Guard clause: Ensure we don't decorate the block twice during editor re-renders
  if (block.classList.contains('carousel-initialized')) return;

  // 2. Locate or create the structural layout inner element safely without wiping HTML
  let carouselInner = block.querySelector('.carousel__inner');
  if (!carouselInner) {
    carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel__inner');
  }

  // 3. Collect the existing slides injected by the Universal Editor
  // Filter out any buttons or controls if this runs on an update loop
  const incomingSlides = [...block.children].filter(
    (child) => child !== carouselInner && !child.classList.contains('carousel__control') && !child.classList.contains('carousel__dots'),
  );

  // 4. In-place transformation of existing elements to retain all Editor metadata hooks
  // 4. In-place transformation of existing elements to retain all Editor metadata hooks
  incomingSlides.forEach((slide, i) => {
    slide.classList.add('carousel__item');
    if (i === 0) slide.classList.add('carousel__item--active');

    // The editor renders fields in cell columns inside the row.
    const columns = [...slide.children];
    if (columns.length > 0) {
      // Check if the content container already exists to avoid duplicate stacking
      let contentContainer = slide.querySelector('.carousel__item-content');
      if (!contentContainer) {
        contentContainer = document.createElement('div');
        contentContainer.classList.add('carousel__item-content');

        // FIXED: Loop through each individual column cell to look for authored content
        columns.forEach((col) => {
          // Look for an image, video, or picture wrapper (Banner column)
          const img = col.querySelector('picture, img');
          if (img) {
            col.className = 'carousel__item-image';
            // Leave the column in place so its tracking attributes survive
            return;
          }

          // Look for text, titles, descriptions, and buttons
          const headings = col.querySelector('h1, h2, h3, h4, h5, h6');
          if (headings) {
            headings.className = 'carousel__item-title';
            contentContainer.appendChild(headings);
          }

          const ctaLink = col.querySelector('a');
          if (ctaLink) {
            ctaLink.className = 'carousel__item-cta';
            contentContainer.appendChild(ctaLink);
          }

          // Any other paragraph becomes description text
          const paragraphs = [...col.querySelectorAll('p')].filter((p) => !p.querySelector('a'));
          paragraphs.forEach((p) => {
            p.className = 'carousel__item-desc';
            contentContainer.appendChild(p);
          });

          // If the column has become completely empty after moving text elements, clean it up
          if (col.innerHTML.trim() === '' && col.parentNode === slide) {
            slide.removeChild(col);
          }
        });

        // Append our beautifully structured text card to the slide container
        slide.appendChild(contentContainer);
      }
    }
    // Reparent the fully mapped slide element directly into our carousel wrapper
    carouselInner.appendChild(slide);
  });

  block.prepend(carouselInner);

  // 5. Inject Navigation Controls conditionally if they aren't already present
  let leftBtn = block.querySelector('.carousel__control--left');
  let rightBtn = block.querySelector('.carousel__control--right');
  let dots = block.querySelector('.carousel__dots');

  if (!leftBtn) {
    leftBtn = document.createElement('button');
    leftBtn.classList.add('carousel__control', 'carousel__control--left');
    leftBtn.setAttribute('aria-label', 'Previous slide');
    leftBtn.innerHTML = '‹';
    block.appendChild(leftBtn);
  }

  if (!rightBtn) {
    rightBtn = document.createElement('button');
    rightBtn.classList.add('carousel__control', 'carousel__control--right');
    rightBtn.setAttribute('aria-label', 'Next slide');
    rightBtn.innerHTML = '›';
    block.appendChild(rightBtn);
  }

  if (!dots) {
    dots = document.createElement('div');
    dots.classList.add('carousel__dots');
    block.appendChild(dots);
  }

  // Clear stale dots if this loop is processing a fresh element update tracking loop
  dots.innerHTML = '';
  incomingSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel__dot');
    if (i === 0) dot.classList.add('carousel__dot--active');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.dataset.index = i;
    dots.appendChild(dot);
  });

  // 6. Component Interactive Behaviors
  let currentIndex = 0;
  const items = carouselInner.querySelectorAll('.carousel__item');
  const dotBtns = dots.querySelectorAll('.carousel__dot');

  function goToSlide(index) {
    if (items.length === 0) return;
    items[currentIndex]?.classList.remove('carousel__item--active');
    dotBtns[currentIndex]?.classList.remove('carousel__dot--active');
    currentIndex = (index + items.length) % items.length;
    items[currentIndex]?.classList.add('carousel__item--active');
    dotBtns[currentIndex]?.classList.add('carousel__dot--active');
  }

  // Re-bind listeners safely to dynamic nodes
  leftBtn.replaceWith(leftBtn.cloneNode(true));
  rightBtn.replaceWith(rightBtn.cloneNode(true));
  leftBtn = block.querySelector('.carousel__control--left');
  rightBtn = block.querySelector('.carousel__control--right');

  leftBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  rightBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  dots.querySelectorAll('.carousel__dot').forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  let timer = setInterval(() => goToSlide(currentIndex + 1), 5000);
  block.addEventListener('mouseenter', () => clearInterval(timer));
  block.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(() => goToSlide(currentIndex + 1), 5000);
  });

  block.setAttribute('tabindex', '0');
  block.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
  });

  block.classList.add('carousel-initialized');
}
