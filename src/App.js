import React, {useState} from "react";
import useSWR from 'swr'

import {MAX_POKEMONS_LIMIT, POKEMON_API_BASE_URL} from "./config";
import PokemonListTemplate from "./components/PokemonListTemplate";
import PokemonListPaginationTemplate from "./components/PokemonListPaginationTemplate";
import PokemonListLoaderTemplate from "./components/PokemonListLoaderTemplate";
import ErrorTemplate from "./components/ErrorTemplate";
import LayoutTemplate from "./components/LayoutTemplate";


function App() {

    function getPokemonListByPageURL(page) {
        return `${POKEMON_API_BASE_URL}/pokemon?limit=${MAX_POKEMONS_LIMIT}&offset=${page * MAX_POKEMONS_LIMIT}`
    }

    async function getPokemonListByPage(page) {
        const pokemonList = await fetch(getPokemonListByPageURL(page)).then(r => r.json())
        const richPokemonResults = await Promise.all(pokemonList.results.map(pokemonObject => fetch(pokemonObject.url).then(r => r.json())))

        const calculatedPageCount = Math.floor(pokemonList.count / MAX_POKEMONS_LIMIT)
        setTotalPages(calculatedPageCount)

        return {
            'count': pokemonList.count,
            'results': richPokemonResults
        }
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const {data, error} = useSWR(getPokemonListByPageURL(currentPage), () => getPokemonListByPage(currentPage))

    function _handlePageChange(e, page) {
        setCurrentPage(page)
    }

    if (error) return <ErrorTemplate/>
    return (
        <LayoutTemplate>
            {data ? <PokemonListTemplate data={data.results}/> : <PokemonListLoaderTemplate/>}
            <PokemonListPaginationTemplate count={totalPages} page={currentPage} onChange={_handlePageChange}/>
        </LayoutTemplate>
    );
}

export default App;
