import { fetchAbilityData } from "@/services/api/server/abilityService";
import { NameURL } from "@/types";

export default async function AbilityTableRow({
  ability,
}: {
  ability: NameURL;
}) {
  const abilityData = await fetchAbilityData(ability.name);

  if (!abilityData || !abilityData.pokemon.length) return null;

  const englishEffect = abilityData.effect_entries.find(
    (entry) => entry.language.name === "en"
  )?.short_effect;

  return (
    <tr>
      <td className="capitalize">{abilityData.name}</td>
      <td>{abilityData.pokemon.length}</td>
      <td>{englishEffect ?? "No description available."}</td>
      <td className="capitalize">{abilityData.generation.name}</td>
    </tr>
  );
}
