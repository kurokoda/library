const trimString = (string) => {
  const maxStringLength = 30;

  if (string.length > maxStringLength) {
    string = string.slice(0, maxStringLength - 3) + "...";
  }

  return string;
};

export default trimString;
