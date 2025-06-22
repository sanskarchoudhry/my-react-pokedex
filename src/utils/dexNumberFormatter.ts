export function dexNumberFormatter(dexNumber: string): string {
  const zeroes = "0000";

  const remainingLength = zeroes.length - String(dexNumber).length;

  return "#" + zeroes.slice(0, remainingLength) + dexNumber;
}
