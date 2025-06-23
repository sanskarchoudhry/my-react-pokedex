import { useEffect, useState } from "react";
import {
  fetchPokemonData,
  PokemonData,
  PokemonSpeciesData,
} from "../../../services/api/pokemonService";
import { axiosClient } from "../../../services/api";
import InfoItem from "./InfoItem";
import { dexNumberFormatter } from "../../../utils/dexNumberFormatter";
import { types } from "../../../constants/pokemonType";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1">
      <h2 className="font-bold text-3xl capitalize mb-4 text-center">
        {title}
      </h2>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function PokedexData({
  pokemonData,
  pokemonSpeciesData,
}: {
  pokemonData: PokemonData;
  pokemonSpeciesData: PokemonSpeciesData;
}) {
  return (
    <Section title="Pokedex Data">
      <InfoItem
        label="National No."
        value={dexNumberFormatter(
          pokemonSpeciesData.pokedex_numbers[0]?.entry_number
        )}
      />

      <InfoItem
        label="Type"
        value={
          <div className="flex gap-2">
            {pokemonData.types.map((type, index) => (
              <span
                key={index}
                className={`text-white text-[10px] font-semibold uppercase px-3 py-1 rounded-[4px]`}
                style={{ backgroundColor: types[type.type.name]?.bgColor }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        }
      />

      <InfoItem label="Species" value={pokemonSpeciesData.genera[7]?.genus} />
      <InfoItem label="Height" value={`${pokemonData.height}`} />
      <InfoItem label="Weight" value={`${pokemonData.weight}`} />

      <InfoItem
        label="Abilities"
        value={
          <div className="flex flex-col">
            {pokemonData.abilities.map((item, index) => (
              <span key={index}>
                {item.ability.name}{" "}
                {item.is_hidden && (
                  <span className="text-sm text-gray-500">(hidden)</span>
                )}
              </span>
            ))}
          </div>
        }
      />

      <InfoItem
        label="Local No."
        value={
          <div className="flex flex-col">
            {pokemonSpeciesData.pokedex_numbers.slice(1).map((entry, index) => (
              <span key={index}>
                {entry.entry_number}{" "}
                <span className="text-sm text-gray-500">
                  ({entry.pokedex.name})
                </span>
              </span>
            ))}
          </div>
        }
      />
    </Section>
  );
}

export default function PokemonInfo({ pokemonName }: { pokemonName: string }) {
  const [pokemonData, setPokemonData] = useState<PokemonData>();
  const [pokemonSpeciesData, setPokemonSpeciesData] =
    useState<PokemonSpeciesData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonDataResponse = await fetchPokemonData(void 0, pokemonName);
        const speciesURL = pokemonDataResponse?.species?.url;
        const [speciesResponse] = await Promise.all([
          axiosClient.get(speciesURL),
        ]);

        setPokemonData(pokemonDataResponse);
        setPokemonSpeciesData(speciesResponse.data);
      } catch (error) {
        console.error("Error fetching Pokémon or species data:", error);
      }
    };

    fetchData();
  }, [pokemonName]);

  if (!pokemonData || !pokemonSpeciesData) return null;

  return (
    <section className="flex flex-col md:flex-row gap-14">
      <div className="flex justify-center">
        <img
          src={pokemonData.sprites?.other?.["official-artwork"]?.front_default}
          alt={`${pokemonData.name} image`}
          className="h-[25rem]"
        />
      </div>

      <PokedexData
        pokemonData={pokemonData}
        pokemonSpeciesData={pokemonSpeciesData}
      />

      <div className="flex flex-col gap-8">
        <Section title="Training">
          <InfoItem
            label="Catch Rate"
            value={pokemonSpeciesData.capture_rate}
          />
          <InfoItem
            label="Base Friendship"
            value={pokemonSpeciesData.base_happiness}
          />
          <InfoItem label="Base Exp" value={pokemonData.base_experience} />
          <InfoItem
            label="Growth Rate"
            value={pokemonSpeciesData.growth_rate?.name}
          />
        </Section>

        <Section title="Breeding">
          <InfoItem
            label="Egg Groups"
            value={
              <div className="flex gap-2 flex-wrap">
                {pokemonSpeciesData.egg_groups.map((group, index) => (
                  <a
                    key={index}
                    href={group.url}
                    className="capitalize text-link-blue hover:underline"
                  >
                    {group.name}
                  </a>
                ))}
              </div>
            }
          />
          <InfoItem
            label="Egg Cycles"
            value={pokemonSpeciesData.hatch_counter}
          />
        </Section>
      </div>
    </section>
  );
}
