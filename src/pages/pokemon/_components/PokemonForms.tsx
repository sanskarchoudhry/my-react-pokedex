// TODO: Better file name

import React, { useEffect, useState } from "react";
import { getPokemonForms, PokemonForm } from "../../../utils/getPokemonForms";

function PokemonForms({ url }: { url: string }) {
  const [pokemonVarietyData, setPokemonVarietyData] = useState<PokemonForm>();

  async function getVarietyData() {
    const data = await getPokemonForms(url);
    setPokemonVarietyData(data);
  }
  useEffect(() => {
    getVarietyData();
  }, [url]);
  console.log(pokemonVarietyData);

  return <div>PokemonForms</div>;
}

export default PokemonForms;
