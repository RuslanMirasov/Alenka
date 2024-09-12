import { popup } from './modal.js';
const forms = document.querySelectorAll('.form');
const errorMessages = {
  empty: 'Поле не заполнено',
  email: 'Не верный формат E-mail',
  phone: 'Не верный формат телефона',
  password: 'Не верный формат пароля',
};

const addError = (labelEl, inputEl, errorEl, errorText) => {
  labelEl.classList.add('invalid');
  inputEl.classList.add('invalid');
  if (!errorEl) {
    const errorEl = document.createElement('span');
    errorEl.setAttribute('class', 'error');
    errorEl.innerHTML = errorText;
    labelEl.querySelector('.label__text').append(errorEl);
    return;
  }
  errorEl.innerHTML = errorText;
};

// INPUT VALIDATION
const inputValidation = input => {
  let isValid = true;
  const labelEl = input.closest('label');
  const errorEl = labelEl.querySelector('.error');
  const value = input.value.trim();

  if (!value) {
    isValid = false;
    addError(labelEl, input, errorEl, errorMessages.empty);
  } else if (input.type === 'email' && !/^[\w\.-]+@[\w\.-]+\.\w{2,4}$/.test(value)) {
    isValid = false;
    addError(labelEl, input, errorEl, errorMessages.email);
  } else if (input.type === 'password' && !/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>,.?\/\\\-=`~]+$/.test(value)) {
    isValid = false;
    addError(labelEl, input, errorEl, errorMessages.password);
  } else if (input.type === 'tel' && !/^\+7\s\d{3}\s\d{3}-\d{2}-\d{2}$/.test(value)) {
    isValid = false;
    addError(labelEl, input, errorEl, errorMessages.phone);
  }

  return isValid;
};

// FORM VALIDATION
const formValidation = form => {
  let errors = 0;
  const requiredInputs = form.querySelectorAll('[required]');
  requiredInputs.forEach(input => {
    const isInputValid = inputValidation(input);
    if (!isInputValid) {
      errors += 1;
    }
  });
  return errors === 0;
};

// ON SUBMIT FUNCTION
const handleSubmit = e => {
  e.preventDefault();
  const isFormValid = formValidation(e.target);
  if (!isFormValid) {
    return;
  }
  e.target.reset();
  popup('confirm-password');
};

forms.forEach(form => form.addEventListener('submit', handleSubmit));
