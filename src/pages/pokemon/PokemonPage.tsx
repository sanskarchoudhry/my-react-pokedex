import { useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import PokemonDetails from "./_components/PokemonDetails";

export default function PokemonPage() {
  const { name } = useParams();

  return (
    <main className="flex flex-col justify-center items-center bg-[url(/assets/images/bg-pattern.jpg)]">
      <Banner />
      {name && <PokemonDetails pokemonName={name} />}
    </main>
  );
}
