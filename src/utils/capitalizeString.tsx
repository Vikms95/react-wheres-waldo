const capitalizeString = (string: string) => {
  const char = string.charAt(0).toUpperCase();
  const remainder = string.slice(1);
  return char + remainder;
};

export default capitalizeString;
