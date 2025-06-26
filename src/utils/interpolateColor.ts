export function colorBars(statValue: number): string {
  if (statValue >= 150) return "#01c3ba";
  else if (statValue >= 120) return "#23ce5a";
  else if (statValue >= 90) return "#a0e616";
  else if (statValue >= 60) return "#ffdd57";
  else if (statValue >= 30) return "#ffdd57";
  else return "#f44240";
}
