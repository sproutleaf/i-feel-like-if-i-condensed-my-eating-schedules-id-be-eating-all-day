const scroller = new virtualScroll({
    mouseMultiplier: 0.05,
    touchMultiplier: 0.05
});

const items = document.querySelectorAll('.entry');
const radius = document.querySelector('#circle').offsetHeight / 2;
const radians = 2 * Math.PI / items.length;
const wrapper = document.querySelector('#wrapper');

// items.forEach((el, i) => {
//     const alpha = Math.PI - (i * radians);

//     if (i === 0) {
//         el.style.transform = `translate(0, -${radius}px)`;
//     } else {
//         el.style.transform = `translate(${radius * Math.sin(alpha)}px, ${radius * Math.cos(alpha)}px)`;
//     }
// });

// scroller.on(e => wrapper.style.transform = `translate(${radius * Math.sin(e.y / 360)}px, ${radius * Math.cos(e.y / 360)}px)`);

$(document).ready(() => {
    let deviceTime = getDeviceTime();
    const ids = [];
    const entries = $('#entries .entry');
    for (const entry of entries) {
        // trims 't'
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

    let start = findStartIndex(deviceTime);
    let perc = start / ids.length;
    let o = perc * 360;

    console.log("product", perc * 360);
    wrapper.style.transform = `translate(${radius * Math.sin(perc * 360)}px, ${radius * Math.cos(perc * 360)}px)`

    items.forEach((el, i) => {
        const alpha = Math.PI - (i * radians);

        if (i === 0) {
            el.style.transform = `translate(0, -${radius}px)`;
        } else {
            el.style.transform = `translate(${radius * Math.sin(alpha)}px, ${radius * Math.cos(alpha)}px)`;
        }
    });

    scroller.on(e => {
        console.log("e.y ", e.y);
        wrapper.style.transform = `translate(${radius * Math.sin((o + e.y / 360) % o)}px, ${radius * Math.cos((o + e.y / 360) % o)}px)`
        console.log("sin: ", Math.sin(perc * 360 + e.y / 360));
        console.log("cos: ", Math.cos(perc * 360 + e.y / 360));
    });

});

const getDeviceTime = () => {
    const currentTimestamp = Date.now();
    const currentTime = new Date(currentTimestamp);
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const combinedTimeStr = hour.toString() + minute.toString();
    const fourDigitCombinedTimeStr = combinedTimeStr.padStart(4, '0');
    const time = parseInt(fourDigitCombinedTimeStr, 10);

    return time;
};

