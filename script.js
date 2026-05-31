let isRecording = false;
let isPlaying = false;
let recordingStart= null;
let sequence = [];
let playbackTimers = [];

function play(link, pad) {
let audio = new Audio(link);
audio.load();
audio.play();

if (isRecording) {
  sequence.push({
    pad: pad,
    time: Date.now() - recordingStart
  });
}
}

function triggerRipple(pad, e) {
  const rect = pad.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top  - size / 2;

  const ripple = document.createElement('span');
  ripple.classList.add('ripple-el');
  ripple.style.cssText = `
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
  `;
  pad.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

document.querySelectorAll('.box').forEach(pad => {
  pad.addEventListener('click', e => triggerRipple(pad, e));
});

const keyMap = {
    'c': 'C',
    'd': 'D',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    'a': 'A',
    'b': 'B',
    'q': 'SE1',
    'w': 'SE2',
    'r': 'SE3',
    't': 'SE4',
    'y': 'M1',
    'u': 'M2',
    'i': 'M3',
    'o': 'M4',
    'p': 'M5'
};

document.addEventListener('keydown', (e) => {
  if (e.repeat) return;
    const note = keyMap[e.key.toLowerCase()];
    if (!note) return;

    const pad =document.querySelector(`[data-note="${note}"]`);
    if (pad) pad.click();
});

function startRecording() {
  sequence = [];
  isRecording = true;
  recordingStart = Date.now();
  document.getElementById('btn-rec').style.background = '#e05555';
}

function stopRecording() {
  isRecording = false;
  document.getElementById('btn-rec').style.background = '';
}

function playSequence() {
  if (sequence.length === 0) return;{
  if (isPlaying) stopPlayback();

  isPlaying = true;

  sequence.forEach(event => {
    const timer = setTimeout(() => {
      event.pad.click();
    }, event.time);

    playbackTimers.push(timer);
  });

  const duration = sequence[sequence.length - 1].time + 500;
  const finalTimer = setTimeout(() => { isPlaying = false;}, duration);
  playbackTimers.push(finalTimer);
}

function stopPlayback() {
  playbackTimers.forEach(t => clearTimeout(t));
  playbackTimers = [];
  isPlaying = false;
}
  }