import GenerationSidebar from "../../components/GenerationSidebar";
import Banner from "../../components/Banner";
import PokemonCardList from "../../components/PokemonCardList";

export type PokemonList = {
  name: string;
  url: string;
};

export default function HomePage() {
  return (
    <main className="flex flex-col justify-center items-center">
      <Banner />
      {/* <section className="flex w-full justify-between"> */}
      <GenerationSidebar />

      <PokemonCardList />
      {/* </section> */}
    </main>
  );
}
