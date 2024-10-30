/**
 * @param {string} endTime 
 * @param {string} startTime 
 */
const getDurationFromEndTimeAndStartTime = (endTime, startTime) => {
    const duration = (new Date(`1970-01-01T${endTime}Z`) - new Date(`1970-01-01T${startTime}Z`)) / 60000;
    return Math.abs(duration);
}

export {
    getDurationFromEndTimeAndStartTime,
}
