import { useParams } from "react-router-dom";
import PokemonDetails from "./_components/PokemonDetails";
import { useEffect, useState } from "react";
import {
  fetchPokemonData,
  PokemonData,
} from "../../services/api/pokemonService";
import ContainerWrapper from "../../components/ContainerWrapper";

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
    <ContainerWrapper>
      {data && <PokemonDetails pokemonName={data.name} />}
    </ContainerWrapper>
  );
}
