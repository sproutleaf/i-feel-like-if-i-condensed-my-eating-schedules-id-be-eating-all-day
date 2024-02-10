// wheel-like infinite scrolling
const numEntries = $('#entries .entry').length;
console.log("Number of entries is: ", numEntries);

const entries = document.getElementById('entries');
$('#entries').on('wheel', function (event) {
    const dir = event.deltaY > 0 ? 0.01 : -0.01;

    if (dir === -0.01) { /* moving down */
        const firstEntry = $('.entry:first');
        console.log("First entry: ", firstEntry.children());
        let newEntry = $('<div>').addClass('entry');

        firstEntry.children().appendTo(newEntry);
        firstEntry.remove();

        $('#entries').append(newEntry);
    } else if (dir === 0.01) { /* moving up */
        const lastEntry = $('.entry:last');
        console.log("Last entry: ", lastEntry.children());
        let newEntry = $('<div>').addClass('entry');

        lastEntry.children().appendTo(newEntry);
        lastEntry.remove();
        $('entries').prepend(newEntry);
    }

    event.preventDefault();
});

// retrieve device time and set the div to center on
const currentTimestamp = Date.now();
const currentTime = new Date(currentTimestamp);
const hour = currentTime.getHours();
const minute = currentTime.getMinutes();
const combinedTimeStr = hour.toString() + minute.toString();
const fourDigitCombinedTimeStr = combinedTimeStr.padStart(4, '0');
const time = parseInt(fourDigitCombinedTimeStr, 10);

console.log(time);