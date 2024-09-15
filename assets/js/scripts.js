document.addEventListener('DOMContentLoaded', () => {
  const refs = {
    scrollLinks: document.querySelectorAll('[data-scrollto]'),
    runTexts: document.querySelectorAll('[data-runtext]'),
    accordeon: document.querySelectorAll('[data-accordeon]'),
    header: document.querySelector('.header'),
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
});
