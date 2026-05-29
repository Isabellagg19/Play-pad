function play(link) {
let audio = new Audio(link);
audio.load();
audio.play();
}

function ripple1(pad, e) {
    const rect = pad.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size /2;
    const y = e.clientY - rect.top - size /2;

const ripple = document.createElement('span');
ripple.classList.add('ripple-el');
ripple.style.cssText = `
width: ${size}px;
height: ${size}px;
left: ${x}px;
top: ${y}px;
`;

pad.appendChild(ripple);
ripple.addEventListener('animationed', () => ripple.remove());
}

document.querySelectorAll('.box').forEach(pad => {
    pad.addEventListener('click', e => triggerRipple(pad,e));
});






