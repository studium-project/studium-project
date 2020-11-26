const makeResponse = (code, message, data = {}) => {
    data.code = code;
    data.message = message;

    return data;
};

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
};

const debug = function(...args) {
    if ('production' !== process.env.NODE_ENV) console.log.apply(null, args);
};

// const formatDate = (time) => {
//     const d = new Date(time);
//     return `${d.getMonth() +
//         1}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분`;
// };

const formatDate = (time) => {
    const d = new Date(time);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d
        .getHours()
        .toString()
        .padStart(2, 0)}:${d
        .getMinutes()
        .toString()
        .padStart(2, 0)}:${d
        .getSeconds()
        .toString()
        .padStart(2, 0)}`;
};

const formatDate2 = (time) => {
    if (!time) return time;
    const d = new Date(time);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d
        .getHours()
        .toString()
        .padStart(2, 0)}:${d
        .getMinutes()
        .toString()
        .padStart(2, 0)}`;
};

const maskFlag = (flag) => {
    return (
        'Studium{' + '*'.repeat(flag.match(/(?:{)(.*)(?:})/)[1].length) + '}'
    );
};

const formatUsername = (s) => {
    let pivot = 15;
    if (s.length > pivot) {
        return s.substr(0, pivot) + '…';
    } else {
        return s;
    }
};

module.exports = {
    makeResponse,
    capitalize,
    debug,
    formatDate,
    formatDate2,
    maskFlag,
    formatUsername,
};
