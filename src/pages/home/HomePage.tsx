import GenerationSidebar from "../../components/GenerationSidebar";
import Banner from "../../components/Banner";
import PokemonCardList from "./_components/PokemonCardList";
import { useRef } from "react";

export type PokemonList = {
  name: string;
  url: string;
};

export default function HomePage() {
  const generationRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  return (
    <main className="flex flex-col justify-center items-center bg-[url(/assets/images/bg-pattern.jpg)]">
      <Banner />
      <GenerationSidebar generationRefs={generationRefs} />
      <PokemonCardList generationRefs={generationRefs} />
    </main>
  );
}
