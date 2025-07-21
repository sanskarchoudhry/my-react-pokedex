export function getGenerationIndex(generationID: string): number {
  const generationIndex = Number(generationID.slice(3));
  return generationIndex - 1;
}

export function formatPokemonName(pokemonName: string): string {
  const formattedName = pokemonName.split("-").join(" ");
  return formattedName;
}

export function extractGenerationIDFromURL(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}

export function getIdFromUrl(url: string): string {
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1];
}
