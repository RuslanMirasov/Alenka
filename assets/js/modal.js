const backdrop = document.querySelector('.backdrop');
// const fixedElements = [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed');
const scrollbarWidth = window.innerWidth - document.querySelector('.main').offsetWidth;
const popupButtons = document.querySelectorAll('[data-modal]');

const addPaddingsToFixedElements = width => {
  const fixedElements = [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed');
  document.body.style.paddingRight = width + 'px';
  fixedElements.forEach(fixElement => {
    fixElement.style.paddingRight = width + 'px';
  });
};

export const checkScrollbar = () => {
  addPaddingsToFixedElements(0);
  const scrollbarWidth = window.innerWidth - document.querySelector('.main').offsetWidth;
  if (scrollbarWidth === 0) {
    addPaddingsToFixedElements(0);
    return;
  }
  addPaddingsToFixedElements(scrollbarWidth);
};

const freezeBody = () => {
  if (!document.body.classList.contains('freez')) {
    checkScrollbar();
    document.body.classList.add('freez');
  }
  backdrop.classList.add('active');

  // modifyScrollbar();
};

const unfreezeBody = () => {
  backdrop.classList.remove('active');
  setTimeout(() => {
    checkScrollbar();
    const nenuBackdrop = document.querySelector('[data-js="menu-backdrop"]');
    if (nenuBackdrop && !nenuBackdrop.classList.contains('is-open')) {
      document.body.classList.remove('freez');
    }

    // modifyScrollbar();
  }, 300);
};

// export const modifyScrollbar = () => {
//   if (document.body.classList.contains('freez')) {
//     fixedElements.forEach(fixedElement => {
//       document.body.style.paddingRight = scrollbarWidth + 'px';
//       fixedElement.style.paddingRight = scrollbarWidth + 'px';
//     });
//     return;
//   }
//   fixedElements.forEach(fixedElement => {
//     document.body.style.paddingRight = '0px';
//     fixedElement.style.paddingRight = '0px';
//   });
// };

const handleBackdropClick = e => {
  if (e.target.classList.contains('backdrop') || e.target.classList.contains('modals') || e.target.classList.contains('modal__close')) {
    closeModal();
  }
};

const openModal = e => {
  e.preventDefault();
  const id = e.target.dataset.modal;
  popup(id);
};

export const popup = id => {
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
    }, 20);
  }, 300);
};

const closeActiveModal = () => {
  const activeModal = document.querySelector('.modal.active');
  const activeModalForm = activeModal.querySelector('.form');
  activeModal.classList.remove('visible');
  setTimeout(() => {
    activeModal.classList.remove('active');
    if (activeModalForm) {
      activeModalForm.reset();
    }
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

window.popup = popup;
window.closeModal = closeModal;
