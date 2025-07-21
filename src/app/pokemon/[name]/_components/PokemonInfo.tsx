import TypeStyle from "@/components/TypeStyle";
import {
  PokemonData,
  PokemonSpeciesData,
} from "@/services/api/server/pokemonService";
import { dexNumberFormatter } from "@/utils/dexNumberFormatter";

export const PokemonInfo = ({
  speciesData,
  pokemonData,
}: {
  speciesData: PokemonSpeciesData;
  pokemonData: PokemonData;
}) => {
  if (speciesData && pokemonData) {
    return (
      <section className="flex gap-4">
        <section className="">
          <h3 className="font-bold text-3xl capitalize text-gray-dark">
            Pokedex Data
          </h3>
          <section className="w-72 flex flex-col gap-1 pt-4">
            <div className="flex gap-3 border-y border-y-gray-primary/15 py-0.5">
              <div className="text-gray-primary/75 w-1/3 flex justify-end ">
                National No
              </div>
              <div className=" font-semibold">
                {dexNumberFormatter(speciesData.id)}
              </div>
            </div>
            <div className="flex gap-3 border-b border-b-gray-primary/15 py-0.5">
              <div className="text-gray-primary/75 w-1/3 flex justify-end">
                Type
              </div>
              <div className="flex gap-0.5">
                {pokemonData.types.map((type, index) => (
                  <TypeStyle type={type.type.name} key={index} />
                ))}
              </div>
            </div>
            <div className="flex gap-3 border-b border-b-gray-primary/15 py-0.5">
              <div className="text-gray-primary/75 w-1/3 flex justify-end">
                Species
              </div>
              <div className="text-gray-dark/80 font-semibold">
                {
                  speciesData.genera.filter(
                    (specie) => specie.language.name === "en"
                  )[0].genus
                }
              </div>
            </div>
            <div className="flex gap-3 border-b border-b-gray-primary/15 py-0.5">
              <div className="text-gray-primary/75 w-1/3 flex justify-end">
                Height
              </div>
              <div>{pokemonData.height}</div>
            </div>
            <div className="flex gap-3 border-b border-b-gray-primary/15 py-0.5">
              <div className="text-gray-primary/75 w-1/3 flex justify-end">
                Weight
              </div>
              <div>{pokemonData.weight}</div>
            </div>
            <div className="flex gap-3 border-b border-b-gray-primary/15 py-0.5">
              <div className="text-gray-primary/75 w-1/3 flex justify-end">
                Abilities
              </div>
              <div className="flex flex-col">
                {pokemonData.abilities.map((ability, index) => (
                  <span key={index} className="text-link-blue capitalize">
                    {ability.ability.name}{" "}
                    {ability.is_hidden && (
                      <span className="text-gray-primary/60 text-sm">
                        (hidden ability)
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3 border-b border-b-gray-primary/15 py-0.5">
              <div className="text-gray-primary/75 w-1/3 flex justify-end">
                Local No
              </div>
              <div className="flex flex-col">
                {speciesData.pokedex_numbers.slice(1).map((entry, index) => (
                  <span key={index} className="text-sm text-gray-dark/90">
                    {dexNumberFormatter(entry.entry_number)}{" "}
                    <span className="text-sm text-gray-500">
                      ({entry.pokedex.name})
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </section>
        </section>
        <section className=" flex flex-col gap-4">
          <section>
            <h3 className="font-bold text-3xl capitalize text-gray-dark">
              Training
            </h3>
            <section className="w-72 flex flex-col gap-1 pt-4">
              <div className="flex gap-3 border-y border-y-gray-primary/15 py-0.5">
                <div className="text-gray-primary/75 w-2/5 flex justify-end">
                  Capture Rate
                </div>
                <div className="text-gray-dark/80 font-semibold">
                  {speciesData.capture_rate}
                </div>
              </div>
              <div className="flex gap-3 border-b border-b-gray-primary/15 py-0.5">
                <div className="text-gray-primary/75 w-2/5 flex justify-end">
                  Base Friendship
                </div>
                <div className=" text-gray-dark/80 font-semibold">
                  {speciesData.base_happiness}
                </div>
              </div>
              <div className="flex gap-3 border-b border-b-gray-primary/15 py-0.5">
                <div className="text-gray-primary/75 w-2/5 flex justify-end">
                  Growth Rate
                </div>
                <div className="text-gray-dark/80 font-semibold capitalize">
                  {speciesData.growth_rate.name}
                </div>
              </div>
            </section>
          </section>
          <section>
            <h3 className="font-bold text-3xl capitalize text-gray-dark">
              Breeding
            </h3>
            <section className="w-72 flex flex-col gap-1 pt-4">
              <div className="flex gap-3 border-y border-y-gray-primary/15 py-0.5">
                <div className="text-gray-primary/75 w-2/5 flex justify-end ">
                  Egg Groups
                </div>
                <div className="flex gap-1 flex-wrap">
                  {speciesData.egg_groups.map((group, index) => (
                    <a
                      key={index}
                      href={group.url}
                      className="capitalize text-link-blue hover:underline"
                    >
                      {group.name}
                      {index === 0 && <span className="text-black">,</span>}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 border-b border-b-gray-primary/15 py-0.5">
                <div className="text-gray-primary/75 w-2/5 flex justify-end">
                  Egg Cycles
                </div>
                <div className="text-gray-dark/80 font-semibold capitalize">
                  {speciesData.hatch_counter}
                </div>
              </div>
            </section>
          </section>
        </section>
      </section>
    );
  }
};
