import axios from "axios";
import React, { useEffect, useState } from "react";

export default function EvolutionChain({ url }: { url: string }) {
  const [evolutionChainURL, setEvolutionChainURL] = useState<string>();
  const [evolutionChainData, setEvolutionChainData] = useState();

  useEffect(() => {
    try {
      const fetchEvolutionChainUrl = async () => {
        const response = await axios.get(url);
        setEvolutionChainURL(response?.data?.evolution_chain?.url);
      };

      fetchEvolutionChainUrl();

      const fetchEvolutionChainData = async () => {
        if (evolutionChainURL) {
          const response = await axios.get(evolutionChainURL);

          setEvolutionChainData(response?.data);
        }
      };

      fetchEvolutionChainData();
    } catch (error) {
      console.error(error);
    }
  }, [url, evolutionChainURL]);

  return <div>{evolutionChainData && <div>DATA</div>}</div>;
}
