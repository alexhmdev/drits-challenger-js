import './style.css';
import * as monaco from 'monaco-editor';

const button = document.querySelector('#run');
const timer = document.querySelector('#timer');
const output = document.querySelector('#output');
let minutes = 29;
let seconds = 59;

const codeEditor = monaco.editor.create(document.getElementById('code'), {
  value: `// Start coding here: 
  function x() {
    console.log('Hello world')
  }`,
  language: 'javascript',
  theme: 'vs-dark',
  formatOnType: true,
  bracketPairColorization: {
    enabled: true,
    independentColorPoolPerBracketType: true,
  },
  automaticLayout: true,
});

button.addEventListener('click', () => {
  try {
    const result = eval(codeEditor.getValue());
    output.textContent = result;
  } catch (error) {}
});

let counter = setInterval(() => {
  seconds -= 1;
  if (minutes <= 0 && seconds < 0) {
    button.disabled = true;
    alert('Se acabo el tiempo');
    clearInterval(counter);
    return;
  }
  if (seconds < 0) {
    minutes -= 1;
    seconds = 59;
  }

  timer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}, 1000);

export default function reset() {
  clearInterval(counter);
  codeEditor.setValue(`// Start coding here: 
  function x() {
    console.log('Hello world')
  }`);
  minutes = 29;
  seconds = 59;
  counter = setInterval(() => {
    seconds -= 1;
    if (minutes <= 0 && seconds < 0) {
      button.disabled = true;
      alert('Se acabo el tiempo');
      clearInterval(counter);
      return;
    }
    if (seconds < 0) {
      minutes -= 1;
      seconds = 59;
    }

    timer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }, 1000);
  output.textContent = '// Here will appear the output when you run your code';
}
