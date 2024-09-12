const inputs = document.querySelectorAll('.input');
const agreeCheckboces = document.querySelectorAll('[data-agree]');

inputs.forEach(input => {
  input.addEventListener('focus', e => {
    const input = e.target;
    const label = input.closest('label');
    if (label) {
      label.classList.remove('invalid');
    }
    input.classList.remove('invalid');
  });
});

agreeCheckboces.forEach(input => {
  input.addEventListener('change', e => {
    const agree = e.target;
    const submitButton = agree.closest('form').querySelector('.button--submit');
    if (agree.checked) {
      submitButton.removeAttribute('disabled');
      return;
    }
    submitButton.setAttribute('disabled', true);
  });
});
