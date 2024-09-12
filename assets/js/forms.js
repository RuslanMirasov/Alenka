const inputs = document.querySelectorAll('.input');
const agreeCheckboces = document.querySelectorAll('[data-agree]');

//input file varibles
const label = document.querySelector('.label-for-file');
const downloadFile = document.querySelector('.download-file');
const inputFile = document.querySelector('.input-file');
const validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff'];

label.addEventListener('dragover', function (event) {
  event.preventDefault(); // Необходимо для разрешения перетаскивания
});

label.addEventListener('drop', function (event) {
  event.preventDefault(); // Необходимо для предотвращения стандартного поведения браузера
  handleFile(event.dataTransfer.files[0]);
});

inputFile.addEventListener('change', function (event) {
  handleFile(event.target.files[0]);
});

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

function handleFile(file) {
  if (file) {
    if (validFormats.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = function (e) {
        label.classList.add('loaded');
        label.style.setProperty('--uploaded-image', `url(${e.target.result})`);
        label.style.background = `#ffffff url(${e.target.result}) no-repeat center center/cover`;

        // Добавляем кнопку сброса после загрузки изображения
        const existingResetButton = downloadFile.querySelector('.file-reset');
        if (!existingResetButton) {
          const resetButton = document.createElement('button');
          resetButton.type = 'button';
          resetButton.classList.add('file-reset');
          downloadFile.appendChild(resetButton);

          // Обработчик для кнопки сброса
          resetButton.addEventListener('click', function () {
            label.classList.remove('loaded');
            label.style.background = '';
            label.querySelector('.label__text').innerHTML = 'Перетащите фото чека или нажмите для выбора';

            // Сбрасываем значение input и удаляем кнопку
            inputFile.value = '';
            resetButton.remove();
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      label.querySelector('.label__text').innerHTML = `
        <span class="error">Неверный формат файла!<br/>Допустимые форматы: JPG, PNG, GIF, WEBP, BMP, TIFF</span>`;
    }
  }
}

// PHONE MASK
const handleTelFocus = e => {
  const tel = e.target;
  if (!tel.value) {
    tel.value = '+7 ___ ___-__-__';
  }
};

const handleTelBlur = e => {
  const tel = e.target;
  if (tel.value === '+7 ___ ___-__-__') {
    tel.value = '';
  }
};

const handleTelKeydown = e => {
  e.preventDefault();
  const tel = e.target;
  const value = tel.value;
  const key = e.data;

  let cursorPosition = tel.selectionStart;

  if (cursorPosition <= 2) return;

  if (key === null) {
    while (cursorPosition > 2 && !/\d/.test(value[cursorPosition - 1])) {
      cursorPosition--;
    }

    if (cursorPosition > 2 && /\d/.test(value[cursorPosition - 1])) {
      const newValue = value.slice(0, cursorPosition - 1) + '_' + value.slice(cursorPosition);
      tel.value = newValue;
      tel.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
    }
    return;
  }

  if (/\d/.test(key)) {
    const underscoreIndex = value.indexOf('_');
    if (underscoreIndex !== -1 && underscoreIndex > 2) {
      const newValue = value.slice(0, underscoreIndex) + key + value.slice(underscoreIndex + 1);
      tel.value = newValue;
      tel.setSelectionRange(underscoreIndex + 1, underscoreIndex + 1);
    }
  }
};

const handleTelClick = e => {
  const tel = e.target;
  const underscoreIndex = tel.value.indexOf('_');
  tel.setSelectionRange(underscoreIndex, underscoreIndex);
};

inputs.forEach(input => {
  if (input.type === 'tel') {
    input.addEventListener('focus', handleTelFocus);
    input.addEventListener('blur', handleTelBlur);
    input.addEventListener('beforeinput', handleTelKeydown);
    input.addEventListener('click', handleTelClick);
  }
});
