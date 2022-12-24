export function formatDuration(duration: number) {
  const itHasHours = duration / 60 / 60 > 1;
  const hours = itHasHours ? Math.floor(duration / 60 / 60) : 0;
  duration -= hours * 60 * 60;
  const itHasMinutes = duration / 60 > 1;
  const minutes = itHasMinutes ? Math.floor(duration / 60) : 0;
  duration -= minutes * 60;
  const seconds = `${duration}`.padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds}`;
  } else if (minutes > 0) {
    return `${minutes.toString().padStart(2, "0")}:${seconds}`;
  } else {
    return seconds;
  }
}
