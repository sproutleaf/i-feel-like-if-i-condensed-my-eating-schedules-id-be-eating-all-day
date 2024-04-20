const scroller = new virtualScroll({
    mouseMultiplier: 0.05,
    touchMultiplier: 0.05
});

const getDeviceTime = () => {
    const currentTimestamp = Date.now();
    const currentTime = new Date(currentTimestamp);
    const hour = currentTime.getHours().toString().padStart(2, '0');
    const minute = currentTime.getMinutes().toString().padStart(2, '0');
    const combinedTimeStr = hour + minute;
    const time = parseInt(combinedTimeStr, 10);

    return time;
};

const items = document.querySelectorAll('.entry');
const radius = document.querySelector('#circle').offsetHeight / 2;
const radians = 2 * Math.PI / items.length;
const wrapper = document.querySelector('#wrapper');

window.addEventListener('beforeunload', function () {
    scroller.destroy();
});

$(document).ready(() => {
    let deviceTime = getDeviceTime();
    const ids = [];
    const entries = $('#entries .entry');

    for (const entry of entries) {
        let id = entry.id.substring(1);
        ids.push(id);
    }

    function findStartIndex(time) {
        let start = 0;
        if (time > 2330 || time < 30) {
            return start;
        }

        for (let i = 0; i < ids.length - 1; i++) {
            if (time > ids[i] && time < ids[i + 1]) start = i;
        }
        return start;
    }

    let circle = 2 * Math.PI;
    let start = findStartIndex(deviceTime);
    console.log("start index is: ", start);
    let percent = start / ids.length;
    let o = -circle * percent;

    while (o < 0) {
        o += 2 * Math.PI;
    }
    wrapper.style.transform = `translate(${radius * Math.sin(o)}px, ${radius * Math.cos(o)}px)`;

    items.forEach((el, i) => {
        const alpha = Math.PI - (i * radians);

        if (i === 0) {
            el.style.transform = `translate(0, -${radius}px)`;
        } else {
            el.style.transform = `translate(${radius * Math.sin(alpha)}px, ${radius * Math.cos(alpha)}px)`;
        }
    });

    scroller.on(e => {
        if (e.originalEvent.type === 'wheel') {
            wrapper.style.transform = `translate(${radius * Math.sin((o + e.y / 360) % circle)}px, ${radius * Math.cos((o + e.y / 360) % circle)}px)`
        }
    });
});