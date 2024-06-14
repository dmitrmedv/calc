const buttons = document.querySelector('.buttons');
const display = document.querySelector('.text');
buttons.addEventListener('click', onClick);
const box2 = document.querySelector('.box2');
let a = 0;
let b = 0;
let resolt = 0;
let operation = '';
let newNumber = false;
display.textContent = '0';

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
    if (display.textContent.length === 8) {
      newNumber = true;
    }
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
    if (!newNumber) {
      b = Number(display.textContent);
    }
    newNumber = true;
    switch (operation) {
      case '-':
        a -= b;
        if (a.toString().length > 8) {
          display.textContent = Number(a.toString().slice(0, 9));
          return;
        }
        display.textContent = a;
        break;
      case '+':
        a += b;
        if (a.toString().length > 8) {
          display.textContent = Number(a.toString().slice(0, 9));
          return;
        }
        display.textContent = a;
        break;
      case '/':
        a /= b;
        if (a === Infinity || isNaN(a)) {
          display.textContent = 'error';
          return;
        }
        if (a.toString().length > 8) {
          display.textContent = Number(a.toString().slice(0, 9));
          return;
        }
        display.textContent = a;
        break;
      case 'x':
        a *= b;
        if (a.toString().length > 8) {
          display.textContent = Number(a.toString().slice(0, 9));
          return;
        }
        display.textContent = a;
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
      newNumber = true;
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
