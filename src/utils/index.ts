export function getGenerationIndex(generationID: string): number {
  const generationIndex = Number(generationID.slice(3));
  return generationIndex - 1;
}

export function formatPokemonName(pokemonName: string): string {
  const formattedName = pokemonName.split("-").join(" ");
  return formattedName;
}
