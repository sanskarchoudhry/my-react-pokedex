import React, { useEffect, useState } from "react";
import { fetchEvolutionChain } from "../../../services/api/pokemonService";

export default function EvolutionChain({ url }: { url: string }) {
  const [evolutionChainData, setEvolutionChainData] = useState();

  useEffect(() => {
    const fetchEvolutionChainData = async () => {
      const response = await fetchEvolutionChain(url);

      setEvolutionChainData(response);
    };

    fetchEvolutionChainData();
  }, [url]);

  console.log(evolutionChainData);

  return <div>{evolutionChainData && <div>DATA</div>}</div>;
}
