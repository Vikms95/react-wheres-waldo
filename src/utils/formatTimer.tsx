const formatTimer = (timer: string) => {
  let formattedMinutes;
  let formattedSeconds;

  const toSeconds = parseInt(timer, 10);
  const hours = Math.floor(toSeconds / 3600);
  const minutes = Math.floor((toSeconds - (hours * 3600)) / 60);
  const seconds = toSeconds - (hours * 3600) - (minutes * 60);

  if (minutes < 10) { formattedMinutes = `0${minutes}`; }
  if (seconds < 10) { formattedSeconds = `0${seconds}`; }

  return `${formattedMinutes || minutes}
         : ${formattedSeconds || seconds}`;
};

export default formatTimer;
