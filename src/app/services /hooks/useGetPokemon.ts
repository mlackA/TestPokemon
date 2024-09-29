import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonList, Result } from "@/app/interface/PokemonType";
import { Pokemon } from "@/app/interface/InterfacePokemonProperties";

export function useGetPokemon(currentPage?: number, ITEMS_PER_PAGE?: number) {
    const [dataPokemon, setData] = useState<PokemonList | undefined>();
    const [dataPokemonCopy, setDataCopy] = useState<PokemonList | undefined>();

    const [dataPokemonDetails, setDetails] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPokemonData = async () => {
        //@ts-ignore
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        try {
            setLoading(true);
            // Fetch the list of Pokémon
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`);
            setData(response.data);
            setDataCopy(response.data)

            // Fetch details for each Pokémon in the list
            const detailedPromises = response.data.results.map((pokemon: { url: string }) => axios.get(pokemon.url));
            const detailedResponses = await Promise.all(detailedPromises);
            setDetails(detailedResponses.map(res => res.data)); // Set all details in one go

        } catch (err) {
            //@ts-ignore

            setError("Error al capturar los datos de pokemons , Estamos trabajando para solucionarlo");
        } finally {
            setLoading(false);
        }
    };
    const searchPokemon = (pokemon: string) => {
        // Filter the results based on the search query
        if (pokemon) {
            const filteredResults = dataPokemon?.results.filter(x => x.name.toLowerCase().includes(pokemon.toLowerCase())) || [];
            
            // Create a new PokemonList object
            const newPokemonList: PokemonList = {
                count: filteredResults.length,
                results: filteredResults as Result[],
            };
    
            // Set the new data
            setData(newPokemonList);
        } else {
            // Restore the original data
            if (dataPokemonCopy) {
                setData(dataPokemonCopy);
            }
        }
    };

    useEffect(() => {
        fetchPokemonData();
    }, [currentPage, ITEMS_PER_PAGE]);

    return {
        dataPokemon,
        dataPokemonDetails,
        loading,
        error,
        searchPokemon
    };
}