export function calcWPM(correctKeystrokes, startTime, now) {
  if (!startTime || now <= startTime || correctKeystrokes <= 0) return 0;
  const minutes = (now - startTime) / 60000;
  return Math.round((correctKeystrokes / 5) / minutes);
}

export function calcRawWPM(totalKeystrokes, startTime, now) {
  if (!startTime || now <= startTime || totalKeystrokes <= 0) return 0;
  const minutes = (now - startTime) / 60000;
  return Math.round((totalKeystrokes / 5) / minutes);
}

export function calcAccuracy(correctKeystrokes, totalKeystrokes) {
  if (totalKeystrokes <= 0) return 100;
  const percentage = Math.round((correctKeystrokes / totalKeystrokes) * 100);
  return Math.max(0, Math.min(100, percentage));
}

export function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function formatDate(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return 'Unknown';
  return `${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} ${date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}`;
}
