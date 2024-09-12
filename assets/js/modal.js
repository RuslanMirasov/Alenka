const backdrop = document.querySelector('.backdrop');
const fixedElements = [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed');
const scrollbarWidth = window.innerWidth - document.querySelector('.main').offsetWidth;
const popupButtons = document.querySelectorAll('[data-modal]');

const freezeBody = () => {
  document.body.classList.add('freez');
  backdrop.classList.add('active');
  modifyScrollbar();
};

const unfreezeBody = () => {
  backdrop.classList.remove('active');
  setTimeout(() => {
    document.body.classList.remove('freez');
    modifyScrollbar();
  }, 300);
};

const modifyScrollbar = () => {
  if (document.body.classList.contains('freez')) {
    fixedElements.forEach(fixedElement => {
      document.body.style.paddingRight = scrollbarWidth + 'px';
      fixedElement.style.paddingRight = scrollbarWidth + 'px';
    });
    return;
  }
  fixedElements.forEach(fixedElement => {
    document.body.style.paddingRight = '0px';
    fixedElement.style.paddingRight = '0px';
  });
};

const handleBackdropClick = e => {
  if (
    e.target.classList.contains('backdrop') ||
    e.target.classList.contains('modals') ||
    e.target.classList.contains('modal__close')
  ) {
    closeModal();
  }
};

const openModal = e => {
  e.preventDefault();
  const id = e.target.dataset.modal;
  const activeModal = document.querySelector('.modal.active');
  const currentModal = document.getElementById(id);
  if (!activeModal) {
    freezeBody();
    currentModal.classList.add('active');
    setTimeout(() => {
      currentModal.classList.add('visible');
    }, 200);
    return;
  }
  closeActiveModal();
  setTimeout(() => {
    currentModal.classList.add('active');
    setTimeout(() => {
      currentModal.classList.add('visible');
    }, 10);
  }, 300);
};

const closeActiveModal = () => {
  const activeModal = document.querySelector('.modal.active');
  activeModal.classList.remove('visible');
  setTimeout(() => {
    activeModal.classList.remove('active');
  }, 300);
};

const closeModal = () => {
  closeActiveModal();
  setTimeout(() => {
    unfreezeBody();
  }, 300);
};

popupButtons.forEach(button => {
  button.addEventListener('click', openModal);
});

backdrop.addEventListener('click', handleBackdropClick);
