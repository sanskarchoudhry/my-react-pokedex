// TODO: Better file name

import React, { useEffect, useState } from "react";
import { getPokemonForms, PokemonForm } from "../../../utils/getPokemonForms";
import StatsWrapper from "./StatsWrapper";

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

  return (
    <div>
      <ul>
        {pokemonVarietyData?.map((pokemonData, index) => {
          return (
            <li key={index}>
              {pokemonData.pokemon.name}
              <div>
                <StatsWrapper pokemonName={pokemonData.pokemon.name} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PokemonForms;
