import GenerationSidebar from "../../components/GenerationSidebar";
import Banner from "../../components/Banner";
import PokemonCardList from "../../components/PokemonCardList";
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
      {/* <section className="flex w-full justify-between"> */}
      <GenerationSidebar generationRefs={generationRefs} />
      <PokemonCardList generationRefs={generationRefs} />

      {/* </section> */}
    </main>
  );
}
