function parseTime(input) {
    const timeUnits = {
        m: 60000,  // milliseconds in a minute
        h: 3600000, // milliseconds in an hour
        d: 86400000 // milliseconds in a day
    };

    const regex = /([0-9]+)([mhd])/g;
    let totalMilliseconds = 0;
    let match;

    while ((match = regex.exec(input)) !== null) {
        const value = parseInt(match[1], 10);
        const unit = match[2];
        totalMilliseconds += value * timeUnits[unit];
    }

    return totalMilliseconds;
}

function formatTime(milliseconds) {
    const units = {
        d: 86400000,
        h: 3600000,
        m: 60000,
        s: 1000
    };

    let result = '';
    for (const [unit, value] of Object.entries(units)) {
        const count = Math.floor(milliseconds / value);
        if (count > 0) {
            result += `${count}${unit}`;
            milliseconds -= count * value;
        }
    }

    return result.length > 0 ? result : '0s';
}

// Example usage:
// console.log(parseTime('5m'));  // 300000
// console.log(formatTime(300000)); // '5m'