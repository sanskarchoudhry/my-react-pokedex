import GenerationSidebar from "../../components/GenerationSidebar";
import PokemonCardList from "./_components/PokemonCardList";
import { useRef } from "react";
import ContainerWrapper from "../../components/ContainerWrapper";

export type PokemonList = {
  name: string;
  url: string;
};

export default function HomePage() {
  const generationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  return (
    <ContainerWrapper>
      <GenerationSidebar generationRefs={generationRefs} />
      <PokemonCardList generationRefs={generationRefs} />
    </ContainerWrapper>
  );
}
