let audioVolume = 0.6;

let autoMusicIntervalId = null;
let autoMusicOn = false;

let currentTheme = 'theme1';

const theme1 = {
  '--background-color': '#091921',
  '--text-color': '#00fff1'
};

const theme2 = {
  '--background-color': '#f7c340',
  '--text-color': '#2d2d2d'
};

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const getDrumKey = (drum) => drum.innerHTML;

const getDrumByKey = (key) => {
  const selector = `.drum-${key}`;
  const drum = document.querySelector(selector);

  return drum;
};

const drums = document.querySelectorAll('.drum');

const volumeSlider = document.querySelector('#volume');

const startAutoMusicButton = document.querySelector('#start-auto-music');

const changeThemeButton = document.querySelector('#change-theme');

const keys = Array.from(drums).map(getDrumKey);

const handleVolumeSliderInput = (event) => {
  audioVolume = event.target.value / 100;
};

const animate = (animationClassName, animationDuration, element) => {
  element.classList.add(animationClassName);

  setTimeout(() => {
    element.classList.remove(animationClassName);
  }, animationDuration);  
};

const animateDrum = (key) => {
  const drum = getDrumByKey(key);

  animate('pressed', 300, drum);
};

const playMusic = (path) => {
  const audio = new Audio(path);
  
  audio.volume = audioVolume;
  audio.play();
};

const makeSound = (key) => {
  const soundFilePath = `sounds/${key}.mp3`;

  playMusic(soundFilePath);
};

const handleDrumClick = (event) => {
  const key = getDrumKey(event.target);

  animateDrum(key);
  makeSound(key);
};

const startAutoMusic = () => {
  autoMusicIntervalId = setInterval(() => {
    const key = sample(keys);

    animateDrum(key);
    makeSound(key);
  }, 300);
};

const seTheme = (theme) => {
  const rootStyle = document.documentElement.style;

  Object.keys(theme).forEach((key) => {
    rootStyle.setProperty(key, theme[key]);
  });
};

const handleStartAutoMusicButtonClick = () => {
  if (autoMusicOn) {
    clearInterval(autoMusicIntervalId);
    startAutoMusicButton.innerHTML = 'Start Auto Music';
    startAutoMusicButton.classList.remove('pressed');
    autoMusicOn = false;
    return;
  }

  startAutoMusicButton.innerHTML = 'Stop Auto Music';
  startAutoMusicButton.classList.add('pressed');
  autoMusicOn = true;
  startAutoMusic();
}; 

const handleChangeThemeButtonClick = () => {
  animate('pressed', 100, changeThemeButton);

  if (currentTheme === 'theme1') {
    currentTheme = 'theme2';
    seTheme(theme2);
  }
  else {
    currentTheme = 'theme1';
    seTheme(theme1);
  }
};

drums.forEach((drum) => {
  drum.addEventListener('click', handleDrumClick);
});

volumeSlider.addEventListener('input', handleVolumeSliderInput);

startAutoMusicButton.addEventListener('click', handleStartAutoMusicButtonClick);

changeThemeButton.addEventListener('click', handleChangeThemeButtonClick);
