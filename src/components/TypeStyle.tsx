import { PokemonType, types } from "@/constants/pokemonType";

export default function TypeStyle({
  type,
}: {
  type: PokemonType;
  url?: string;
}) {
  return (
    <span
      className={`text-white text-[10px] font-semibold uppercase px-3 py-1 rounded-[4px]`}
      style={{ backgroundColor: types[type]?.bgColor }}
    >
      {type}
    </span>
  );
}
