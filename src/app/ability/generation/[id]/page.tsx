import { fetchGenerationData } from "@/services/api/server/generationService";
import React from "react";

export default async function AbilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: genID } = await params;

  const abilityList = await (await fetchGenerationData(genID)).abilities;
  console.log(abilityList);
  return <div>page</div>;
}
