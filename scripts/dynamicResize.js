function resizeContent(a, b, c, x, y, z) {
    const mainContent = document.querySelector('.maincontent-centred');
    if (!mainContent) return;
    const vw = window.innerWidth;

    let contentVW;
    if (vw <= a) contentVW = x;
    else if (vw <= b) contentVW = x + ((vw - a) / (b - a)) * (y - x);
    else if (vw <= c) contentVW = y + ((vw - b) / (c - b)) * (z - y);
    else contentVW = z;

    mainContent.style.width = `${contentVW}vw`;
}

function handleResize() {
    resizeContent(1200, 1600, 1920, 100, 80, 60);
}

window.addEventListener('resize', handleResize);
window.addEventListener('DOMContentLoaded', handleResize);
