function play(link) {
let audio = new Audio(link);
audio.load();
audio.play();
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
    const note = keyMap[e.key.toLowerCase()];
    if (!note) return;

    const pad =document.querySelector(`[data-note="${note}"]`);
    if (!pad) return;

    pad.click();
});