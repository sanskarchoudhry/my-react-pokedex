export const formatName = (name: string): string => {
  const nameArr = name.split("-");

  // Mega check
  if (nameArr[1] && nameArr[1].toLowerCase() === "mega") {
    const temp = nameArr[0];
    nameArr[0] = nameArr[1];
    nameArr[1] = temp;
  }

  return nameArr.join(" ");
};
