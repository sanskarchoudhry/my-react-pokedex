import React, { useEffect, useState } from "react";
import {
  getPokemonForms,
  PokemonForm,
} from "../../../services/api/pokemonService";

function PokemonDetails({ pokemonName }: { pokemonName: string }) {
  const [pokemonFormsData, setPokemonFormsData] = useState<PokemonForm>();

  useEffect(() => {
    async function getSpeciesData() {
      const response = await getPokemonForms(pokemonName);
      setPokemonFormsData(response);
    }

    getSpeciesData();
  }, []);

  console.log(pokemonFormsData);

  return (
    <div className="flex flex-col gap-4 pt-8 p-16 w-[75%] bg-white mt-12 rounded-t-[20px] justify-center items-center">
      <h1 className="font-bold text-4xl capitalize">{pokemonName}</h1>
    </div>
  );
}

export default PokemonDetails;
