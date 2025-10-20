/**
 * @param {string} endTime
 * @param {string} startTime
 */
const getDurationFromEndTimeAndStartTime = (endTime, startTime) => {
    const duration = (new Date(`1970-01-01T${endTime}Z`) - new Date(`1970-01-01T${startTime}Z`)) / 60000;
    return Math.abs(duration);
};

/**
 * Calculates the ISO week number for the provided date.
 * Week 1 is the week containing the year's first Thursday.
 * @param {Date} date
 * @returns {number}
 */
const getIsoWeekNumber = (date = new Date()) => {
    const currentDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNumber = currentDate.getUTCDay() || 7;
    currentDate.setUTCDate(currentDate.getUTCDate() + 4 - dayNumber);
    const yearStart = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
};

export {
    getDurationFromEndTimeAndStartTime,
    getIsoWeekNumber,
};
