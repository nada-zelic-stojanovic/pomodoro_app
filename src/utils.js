export const createTimeString = remainingSeconds => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return `${String(minutes).padStart(2, '0')} :
  ${String(seconds).padStart(2, '0')}`;
};
