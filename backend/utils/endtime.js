function calculateEndTime(startTime, durationInMinutes) {
  return new Date(startTime.getTime() + durationInMinutes * 60000);
}

module.exports = { calculateEndTime };