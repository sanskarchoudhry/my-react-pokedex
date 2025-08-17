import { generations } from "@/constants/generations";
import { fetchGenerationData } from "@/services/api/server/generationService";
import AbilityTable from "./generation/_components/AbilityTable";

export default async function AbilityRootPage() {
  const abilityList = await Promise.all(
    generations
      .slice(2)
      .map(async (gen) => (await fetchGenerationData(gen.id)).abilities)
  );
  const flattenedAbilityList = abilityList.flat();

  return (
    <section>
      <section>
        <AbilityTable abilityList={flattenedAbilityList} />
      </section>
    </section>
  );
}
