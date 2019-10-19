export const convertSecondsToMinutes = remainingSeconds => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  return { minutes, seconds };
};
