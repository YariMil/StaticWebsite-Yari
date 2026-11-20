const clickCountKey = 'clickCount';
// Increase this positive number for slower colors; decrease it for faster colors.
const clicksPerNoticeableColorChange = 30;
// Use 0 for vivid colors, 1 for gray, or a value between them for softer colors.
const colorMutedness = 0.64;
let count = 0;

try {
    const savedCount = Number(localStorage.getItem(clickCountKey));
    if (Number.isSafeInteger(savedCount) && savedCount >= 0) {
        count = savedCount;
    }
} catch (error) {
    console.warn('Saved clicks could not be loaded.', error);
}
const countDisplay = document.getElementById('clickCount');
const incrementButton = document.getElementById('incrementButton');
const bubbleLayer = document.getElementById('counterBubbles');
const colorChangeHint = document.getElementById('colorChangeClicks');
if (colorChangeHint) {
    colorChangeHint.textContent = clicksPerNoticeableColorChange;
}

function updateCounter() {
    countDisplay.textContent = count;
    // The home panel uses a slow, time-based CSS animation instead of coloring the whole page.
    if (document.body.classList.contains('home-page')) {
        return;
    }
    // Each channel cycles at its own speed; "noticeable" is an approximate visual guide.
    const colorProgress = count / clicksPerNoticeableColorChange;
    const isDark = document.documentElement.dataset.theme === 'dark';
    const brightness = isDark ? 0.42 : 1;
    // Reduce each channel's distance from gray as mutedness increases.
    const colorAmplitude = 125 * (1 - Math.max(0, Math.min(1, colorMutedness)));
    const red = Math.round((130 + colorAmplitude * Math.sin(colorProgress * 0.74 - Math.PI / 2)) * brightness);
    const green = Math.round((130 + colorAmplitude * Math.sin(colorProgress * 1.06 - Math.PI / 2)) * brightness);
    const blue = Math.round((130 + colorAmplitude * Math.sin(colorProgress * 1.42 + Math.PI / 2)) * brightness);
    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

    // Choose readable text as the background moves between light and dark colors.
    const [linearRed, linearGreen, linearBlue] = [red, green, blue].map(value => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    const luminance = 0.2126 * linearRed + 0.7152 * linearGreen + 0.0722 * linearBlue;
    document.body.style.color = luminance > 0.179 ? '#000' : '#fff';
}

function releaseBubbles() {
    const buttonBounds = incrementButton.getBoundingClientRect();

    for (let index = 0; index < 4; index++) {
        // Keep rapid clicking from leaving too many animated elements on the page.
        if (bubbleLayer.childElementCount >= 80) {
            bubbleLayer.firstElementChild.remove();
        }
        const bubble = document.createElement('span');
        const size = 10 + Math.random() * 14;
        bubble.className = 'counter-bubble';
        bubble.style.left = `${buttonBounds.left + buttonBounds.width * (index + 0.5) / 4 - size / 2}px`;
        bubble.style.top = `${buttonBounds.top - size / 2}px`;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.setProperty('--bubble-drift', `${(Math.random() - 0.5) * 100}px`);
        bubble.style.setProperty('--bubble-rise', `${100 + Math.random() * 100}px`);
        bubble.style.setProperty('--bubble-hue', Math.floor(Math.random() * 360));
        bubble.style.animationDuration = `${900 + Math.random() * 600}ms`;
        bubble.addEventListener('animationend', () => bubble.remove(), { once: true });
        bubbleLayer.appendChild(bubble);
    }
}

incrementButton.addEventListener('click', () => {
    count++;
    try {
        localStorage.setItem(clickCountKey, count.toString());
    } catch (error) {
        console.warn('Clicks could not be saved.', error);
    }
    updateCounter();
    releaseBubbles();
});

document.addEventListener('themechange', updateCounter);
updateCounter();
