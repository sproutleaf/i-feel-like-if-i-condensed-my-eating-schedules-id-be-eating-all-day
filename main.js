const scroller = new virtualScroll({
    mouseMultiplier: 0.05,
    touchMultiplier: 0.05
});

window.addEventListener('beforeunload', function () {
    scroller.destroy();
});

const getDeviceTime = () => {
    const currentTime = new Date(Date.now());
    const time = parseInt(currentTime.getHours().toString().padStart(2, '0') + currentTime.getMinutes().toString().padStart(2, '0'), 10);
    return time;
};

const entries = $('#entries .entry');
let ids = [];
for (const entry of entries) {
    let id = entry.id.substring(1);
    ids.push(id);
};

const findStartIndex = (time) => {
    if (time > 2330 || time < 30) {
        return 0;
    }

    for (let i = 0; i < ids.length - 1; i++) {
        if (time > ids[i] && time < ids[i + 1]) return i;
    }

    return 0;
}

const items = document.querySelectorAll('.entry');
const radians = 2 * Math.PI / items.length;
let radius = document.querySelector('#circle').offsetHeight / 2;
const wrapper = document.querySelector('#wrapper');

const positionEntries = () => {
    radius = document.querySelector('#circle').offsetHeight / 2;

    items.forEach((el, i) => {
        const alpha = Math.PI - (i * radians);

        el.style.transform = i === 0
            ? `translate(0, -${radius}px)`
            : `translate(${radius * Math.sin(alpha)}px, ${radius * Math.cos(alpha)}px)`;
    });
}

$(document).ready(() => {
    let deviceTime = getDeviceTime();

    let circle = 2 * Math.PI;
    let startIndex = findStartIndex(deviceTime);
    let percent = startIndex / ids.length;
    let offset = (circle * (1 - percent)) % circle;

    wrapper.style.transform = `translate(${radius * Math.sin(offset)}px, ${radius * Math.cos(offset)}px)`;

    positionEntries();
    window.addEventListener('resize', positionEntries);

    scroller.on(e => {
        if (e.originalEvent.type === 'wheel') {
            let degree = (offset + e.y / 360) % circle;
            wrapper.style.transform = `translate(${radius * Math.sin(degree)}px, ${radius * Math.cos(degree)}px)`
        }
    });

    var grinding = $('#coffee')[0];
    $('#t0800').on('mouseenter', function () {
        grinding.volume = 0.1;
        grinding.play();
    });
    $('#t0800').on('mouseleave', function () {
        grinding.pause();
        grinding.currentTime = 0;
    });
});