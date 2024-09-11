const inputs = document.querySelectorAll('.input');

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
