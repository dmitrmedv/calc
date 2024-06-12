const buttons = document.querySelector('.buttons');
const display = document.querySelector('.display');
buttons.addEventListener('click', onClick);

let a = 0;
let resolt = 0;
let operation = '';
let newNumber = false;

const buttonsRef = [
  'CE',
  'DEL',
  '%',
  '/',
  '7',
  '8',
  '9',
  'x',
  '4',
  '5',
  '6',
  '-',
  '1',
  '2',
  '3',
  '+',
  '+/-',
  '0',
  '.',
  '=',
];

function getMurckup() {
  return buttonsRef
    .map(item => {
      if (!isNaN(Number(item))) {
        return `<button type='button' class="number button">${item}</button>`;
      } else if (['/', '+', '-', 'x'].includes(item)) {
        return `<button type='button' class="operation button">${item}</button>`;
      } else {
        return `<button type='button' class="${item} button">${item}</button>`;
      }
    })
    .join('');
}

buttons.innerHTML = getMurckup();

function onClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  if (resolt === Infinity || isNaN(resolt)) {
    display.textContent = '0';
    resolt = 0;
    return;
  }

  if (e.target.classList.contains('number')) {
    if (display.textContent === '0' || newNumber) {
      display.textContent = '';
      newNumber = false;
    }
    display.textContent += e.target.textContent;
  }

  if (e.target.classList.contains('operation')) {
    operation = e.target.textContent;
    a = Number(display.textContent);
    newNumber = true;
  }

  if (e.target.textContent === '=') {
    newNumber = true;
    switch (operation) {
      case '-':
        resolt = a - Number(display.textContent);
        display.textContent = Number(resolt.toFixed(8));
        break;
      case '+':
        resolt = a + Number(display.textContent);
        display.textContent = Number(resolt.toFixed(8));
        break;
      case '/':
        resolt = a / Number(display.textContent);
        if (resolt === Infinity || isNaN(resolt)) {
          display.textContent = 'error';
          return;
        }
        display.textContent = Number(resolt.toFixed(8));
        break;
      case 'x':
        resolt = a * Number(display.textContent);
        display.textContent = Number(resolt.toFixed(8));
        break;
    }
  }

  switch (e.target.textContent) {
    case 'DEL':
      let arr = display.textContent.split('');
      arr.pop();
      if (arr.length === 0) {
        display.textContent = '0';
        return;
      }
      display.textContent = arr.join('');
      break;

    case 'CE':
      display.textContent = '0';
      break;

    case '%':
      display.textContent /= 100;
      break;

    case '+/-':
      display.textContent *= -1;
      break;

    case '.':
      if (display.textContent.includes('.')) {
        return;
      }
      display.textContent += '.';
      break;
  }
}
