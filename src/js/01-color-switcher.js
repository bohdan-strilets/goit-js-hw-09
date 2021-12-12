const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function updateBodyBGcolor(color) {
  document.body.style.backgroundColor = color;
}

class ColorSwitcher {
  constructor(updateBodyBGcolor) {
    this.intervalID = null;
    this.isActive = false;
    this.updateBodyBGcolor = updateBodyBGcolor;
    refs.stopBtn.disabled = true;
  }

  startChangeBGcolor() {
    if (this.isActive) {
      return;
    }

    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;

    this.isActive = true;
    this.intervalID = setInterval(() => updateBodyBGcolor(getRandomHexColor()), 1000);
  }

  stopChangeBGcolor() {
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;

    clearInterval(this.intervalID);
    this.isActive = false;
  }
}

const colorSwitcher = new ColorSwitcher();

refs.startBtn.addEventListener('click', () => colorSwitcher.startChangeBGcolor());
refs.stopBtn.addEventListener('click', () => colorSwitcher.stopChangeBGcolor());
