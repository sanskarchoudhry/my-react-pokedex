import { useEffect, useState } from "react";
import {
  fetchPokemonData,
  getPokemonForms,
  PokemonData,
  PokemonForm,
} from "../../../services/api/pokemonService";
import StatsWrapper from "./StatsWrapper";

function PokemonDetails({ pokemonName }: { pokemonName: string }) {
  const [pokemonData, setPokemonData] = useState<PokemonData>();
  const [pokemonFormsData, setPokemonFormsData] = useState<PokemonForm>();
  const [selectedPokemonVariant, setSelectedPokemonVariant] =
    useState<string>(pokemonName);

  useEffect(() => {
    async function getSpeciesData() {
      const response = await getPokemonForms(pokemonName);
      setPokemonFormsData(response);
    }

    async function getPokemonData() {
      const response = await fetchPokemonData(void 0, pokemonName);
      setPokemonData(response);
    }

    getSpeciesData();
    getPokemonData();
  }, []);

  const handlePokemonVariantChange = (pokeName: string) => {
    setSelectedPokemonVariant(pokeName);
  };

  console.log(pokemonData);

  return (
    <div className="flex flex-col gap-4 pt-8 p-16 w-[75%] bg-white mt-12 rounded-t-[20px] justify-center items-center">
      <h1 className="font-bold text-4xl capitalize">{pokemonName}</h1>
      <section>
        <ul className="flex gap-2">
          {pokemonFormsData &&
            pokemonFormsData?.length > 1 &&
            pokemonFormsData?.map((pokemon, index) => {
              return (
                <li
                  onClick={() => {
                    handlePokemonVariantChange(pokemon.pokemon.name);
                  }}
                  key={index}
                  className={`cursor-pointer p-1 px-2 rounded-t-[8px] border-[0.1px] border-gray-primary/20 border-b-white ${
                    pokemon.pokemon.name === selectedPokemonVariant
                      ? "bg-white"
                      : "bg-light-grey"
                  } `}
                >
                  {pokemon.pokemon.name}
                </li>
              );
            })}
        </ul>
        <div>
          <StatsWrapper pokemonName={selectedPokemonVariant} />
        </div>
      </section>
    </div>
  );
}

export default PokemonDetails;
