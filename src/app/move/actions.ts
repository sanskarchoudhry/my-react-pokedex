"use server";

import { axiosClient } from "@/services/api";
import { fetchMoveData, fetchMoveList } from "@/services/api/server/moveService";
import { NameURL } from "@/types";

export async function loadMoreMoves(
  offset: number, 
  limit: number = 20, 
  specificNames?: string[] // Add this optional param
) {
  
  let namesToFetch: string[] = [];

  if (specificNames && specificNames.length > 0) {
    namesToFetch = specificNames;
  } else {
    // Fallback to offset/limit logic if no specific names provided
    const list = await fetchMoveList(limit, offset);
    namesToFetch = list.map((l) => l.name);
  }

  // Fetch details
  const newMoves = await Promise.all(
    namesToFetch.map((name) => fetchMoveData(name))
  );

  return newMoves;
}

export const fetchMovesByType = async (type: string): Promise<NameURL[]> => {
  try {
    const response = await axiosClient.get(`/type/${type}`);
    // The structure is slightly different for types: { pokemon: [], moves: [{ name, url }] }
    return response.data.moves; 
  } catch (error) {
    console.error(`Error fetching moves for type ${type}:`, error);
    return [];
  }
};