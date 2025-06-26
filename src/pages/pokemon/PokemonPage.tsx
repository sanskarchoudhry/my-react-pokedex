import { useParams } from "react-router-dom";
import Banner from "../../components/Banner";
import PokemonDetails from "./_components/PokemonDetails";
import { useEffect, useState } from "react";
import {
  fetchPokemonData,
  PokemonData,
} from "../../services/api/pokemonService";

export default function PokemonPage() {
  const { id } = useParams();
  const [data, setData] = useState<PokemonData>();
  useEffect(() => {
    async function fetchData() {
      const response = await fetchPokemonData(id ?? " ");
      setData(response);
    }

    fetchData();
  }, []);

  return (
    <main className="flex flex-col justify-center items-center bg-[url(/assets/images/bg-pattern.jpg)]">
      <Banner />
      {data && <PokemonDetails pokemonName={data.name} />}
    </main>
  );
}
