document.addEventListener('DOMContentLoaded', () => {
  const refs = {
    scrollLinks: document.querySelectorAll('[data-scrollto]'),
    runTexts: document.querySelectorAll('[data-runtext]'),
    accordeon: document.querySelectorAll('[data-accordeon]'),
    header: document.querySelector('.header'),
    lookSwiper: document.querySelector('.swiper--look'),
  };

  // SCROLL TO BLOCK
  refs.scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = `.${this.dataset.scrollto}`;
      const rect = document.querySelector(target).getBoundingClientRect();
      const distance = rect.top + window.scrollY - refs.header.getBoundingClientRect().height;
      window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
    });
  });

  //SLIDERS
  if (refs.lookSwiper) {
    const swiper = new Swiper(refs.lookSwiper, {
      allowTouchMove: true,
      slidesPerView: 'auto',
      breakpoints: {
        768: {
          spaceBetween: 40, // Расстояние между слайдами на экранах шире 768px
          centeredSlides: false, // Отключаем центровку
        },
        0: {
          spaceBetween: 26, // Расстояние между слайдами на экранах уже 768px
          centeredSlides: true, // Включаем центровку слайдов
        },
      },
    });
  }
});
