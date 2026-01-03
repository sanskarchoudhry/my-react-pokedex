"use client";

import { useState, useEffect, useMemo } from "react";
import MovesListTable from "./MovesListTable";
import { fetchMovesByType, loadMoreMoves } from "../actions";
import { MoveData } from "@/services/api/server/moveService";
import { NameURL } from "@/types";
import { PokemonType, types } from "@/constants/pokemonType";

const PAGE_SIZE = 20;

export default function MoveListContainer({
  allMoveNames, // The "Global Master List" (Default)
  initialDetails,
}: {
  allMoveNames: NameURL[];
  initialDetails: MoveData[];
}) {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  
  // The "Current Master List" (Can be ALL moves OR just FIRE moves)
  const [currentMasterList, setCurrentMasterList] = useState<NameURL[]>(allMoveNames);
  
  const [loadedDetails, setLoadedDetails] = useState<MoveData[]>(initialDetails);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);

  // --- LOGIC: HANDLE TYPE CHANGE ---
  // When type changes, we must fetch a NEW Master List
  useEffect(() => {
    const updateMasterList = async () => {
      if (selectedType === "") {
        // Reset to full list
        setCurrentMasterList(allMoveNames);
      } else {
        setLoading(true);
        // Fetch list of moves for this type (e.g., all Fire moves)
        const typeMoves = await fetchMovesByType(selectedType); 
        setCurrentMasterList(typeMoves);
        setLoading(false);
      }
      setDisplayCount(PAGE_SIZE); // Reset pagination
    };

    updateMasterList();
  }, [selectedType, allMoveNames]);


  // --- LOGIC: FILTER BY NAME ---
  const filteredNames = useMemo(() => {
    if (!searchQuery) return currentMasterList;
    return currentMasterList.filter((m) => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentMasterList]);

  // --- LOGIC: SLICE VISIBLE ---
  const visibleNames = filteredNames.slice(0, displayCount);

  // --- LOGIC: FETCH MISSING DETAILS ---
  useEffect(() => {
    const fetchMissingData = async () => {
      const missingNames = visibleNames.filter(
        (vn) => !loadedDetails.find((d) => d.name === vn.name)
      );

      if (missingNames.length > 0) {
        setLoading(true);
        try {
          const newDetails = await loadMoreMoves(0, 0, missingNames.map(n => n.name));
          setLoadedDetails((prev) => [...prev, ...newDetails]);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMissingData();
  }, [visibleNames, loadedDetails]);

  // --- PREPARE DATA FOR TABLE ---
  const tableData = visibleNames
    .map((vn) => loadedDetails.find((d) => d.name === vn.name))
    .filter((d): d is MoveData => !!d);

  return (
    <>
      {/* --- FILTERS SECTION --- */}
      <div className="flex flex-wrap items-center gap-6 mb-6">
        {/* Name Filter */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-dark">Filter by Name</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setDisplayCount(PAGE_SIZE); }}
            className="w-48 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-link-blue focus:outline-none"
            placeholder="e.g., flamethrower"
          />
        </div>

        {/* Type Filter */}
        <div className="flex flex-col">
          <label className="mb-1 text-sm font-medium text-gray-dark">Filter by Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-48 px-2 py-1 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-link-blue capitalize"
          >
            <option value="">All Types</option>
            {(Object.keys(types) as PokemonType[]).map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* --- TABLE --- */}
      <MovesListTable moveListData={tableData} />

      {/* --- LOADING / PAGINATION --- */}
      {loading && <div className="text-center py-8 text-gray-500">Loading moves...</div>}

      {!loading && tableData.length < filteredNames.length && (
        <div className="flex justify-center mt-8 mb-12">
          <button
            onClick={() => setDisplayCount((prev) => prev + PAGE_SIZE)}
            className="px-6 py-3 bg-link-blue text-white font-semibold rounded-md hover:bg-link-blue/90"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}