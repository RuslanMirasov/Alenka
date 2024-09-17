const consoleScene = document.querySelector('[data-js="scens-counter"]');

import { checkScrollbar } from './modal.js';
const historyButton = document.querySelector('[data-history]');
const history = document.querySelector('[data-js="history"]');

const hideHistory = () => {
  checkScrollbar();
  document.body.classList.remove('body--history');
  history.classList.remove('active');
};

const showHistory = () => {
  checkScrollbar();
  document.body.classList.add('body--history');
  history.classList.add('active');
};

const openHistory = e => {
  e.preventDefault();
  showHistory();
};

historyButton.addEventListener('click', openHistory);

window.hideHistory = hideHistory;
window.showHistory = showHistory;
