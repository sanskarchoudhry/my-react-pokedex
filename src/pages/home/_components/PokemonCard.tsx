import { usePokemonDetails } from "../../../hooks/usePokemonDetails";
import { formatPokemonName } from "../../../utils";
import { dexNumberFormatter } from "../../../utils/dexNumberFormatter";
import { types, PokemonType, Type } from "../../../constants/pokemonType";

export default function PokemonCard({ name }: { name: string }) {
  const { pokemonData, speciesData } = usePokemonDetails(name);

  // if (loading) return <div className="text-sm text-gray-500">Loading...</div>;
  // if (error)
  //   return <div className="text-sm text-red-500">Failed to load data</div>;
  if (!pokemonData || !speciesData) return null;

  return (
    <div className="flex flex-col justify-center items-center w-32 h-56 capitalize">
      <a href={`/pokemon/${speciesData.id}`}>
        <img
          src={pokemonData?.sprites?.other?.["official-artwork"]?.front_default}
          alt={`${speciesData.name} image`}
          className="h-24 w-24 cursor-pointer"
        />
      </a>
      <div className="text-gray-primary opacity-70">
        {dexNumberFormatter(pokemonData.id)}
      </div>
      <a
        href={`/pokemon/${speciesData.id}`}
        className="font-semibold text-gray-primary opacity-90 hover:underline hover:text-link-blue"
      >
        {formatPokemonName(speciesData.name)}
      </a>
      <div className="flex gap-2">
        {pokemonData.types.map((type: Type, index) => {
          const typeName = type.type.name as PokemonType;
          const color = types[typeName]?.bgColor || "gray";

          return (
            <div
              key={index}
              className="py-0.5 text-center font-medium capitalize rounded-md hover:underline cursor-pointer"
              style={{ color }}
            >
              {typeName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
