const getNote = (key) => {
  const notes = {
    KeyA: { note: 'C', frequency: 523.3 },
    KeyW: { note: 'C#', frequency: 554.4 },
    KeyS: { note: 'D', frequency: 587.3 },
    KeyE: { note: 'D#', frequency: 622.3 },
    KeyD: { note: 'E', frequency: 659.3 },
    KeyF: { note: 'F', frequency: 698.5 },
    KeyT: { note: 'F#', frequency: 740.0 },
    KeyG: { note: 'G', frequency: 784.0 },
    KeyY: { note: 'G#', frequency: 830.6 },
    KeyH: { note: 'A', frequency: 880.0 },
    KeyU: { note: 'A#', frequency: 932.3 },
    KeyJ: { note: 'B', frequency: 987.8 },
    KeyK: { note: 'C6', frequency: 1047 }
  };

  return notes[key];
};

const play = (frequency) => playNote(frequency, 'sine');

let context = new AudioContext();
let oscillator = null;
let gain = null;

const playNote = (frequency, type) => {
  setTimeout(() => {
    oscillator = context.createOscillator();
    gain = context.createGain();
    oscillator.type = type;
    oscillator.connect(gain);
    oscillator.frequency.value = frequency;
    gain.connect(context.destination);
    oscillator.start(0);
    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 1);
  }, 1000)
};

const changeBGColor = (note, sharpColor, naturalColor) => {
  const element = document.getElementById(note);
  const bgColor = element.classList[1] === 'sharp' ? sharpColor : naturalColor;
  element.style['background-color'] = bgColor;
};

const playPiano = (event) => {
  const { note, frequency } = getNote(event.code);
  if (!note) {
    return;
  }

  play(frequency);
  changeBGColor(note, '#000000c7', '#e9e6e6');
};

const resetBGColor = (event) => {
  const { note } = getNote(event.code);
  if (!note) {
    return;
  }

  changeBGColor(note, 'black', 'white');
};

const main = () => {
  addEventListener('keydown', playPiano);
  addEventListener('keyup', resetBGColor);
};

window.onload = main;
