const audio = new AudioContext();
const gain = audio.createGain();
let oscillator = audio.createOscillator();
let isPlaying = false;
let freq = 440;

const getElement = (str) => {
  return document.querySelector(String(str));
};

const getNumber = (str) => {
  const element = getElement(str);
  return Number(element.value);
};

const showText = (elementName, text) => {
  const element = getElement(elementName);
  element.textContent = text;
};

const addClass = (elementName, className) => {
  const element = getElement(elementName);
  element.classList.add(className);
};

const removeClass = (elementName, className) => {
  const element = getElement(elementName);
  element.classList.remove(className);
};

const getFreq = () => {
  return getNumber(".freq-range");
};

const getVolume = () => {
  return getNumber(".volume-range");
};


const showFreq = () => {
  freq = getFreq();
  showText(".show-freq-range", freq);
  oscillator.frequency.value = freq;
};

const showVolume = () => {
  const volume = getVolume();
  showText(".show-volume-range", volume);
  gain.gain.value = volume / 1000;
};

const startPlaying = () => {
  showText(".show-playing", "再生中");
  addClass(".show-playing", "is-playing");
  gain.connect(audio.destination);
  oscillator = audio.createOscillator();
  oscillator.connect(gain);
  oscillator.start();
  oscillator.frequency.value = freq;
}

const stopPlaying = () => {
  showText(".show-playing", "停止中");
  removeClass(".show-playing", "is-playing");
  oscillator.disconnect();
}

const changePlaying = () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    startPlaying();
  } else {
    stopPlaying();
  }
}

const main = () => {
  showVolume();
  showFreq();
};

main();
