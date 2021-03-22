import React, {useState} from "react";
import useSWR from 'swr'

import {MAX_POKEMONS_LIMIT, POKEMON_API_BASE_URL} from "./config";
import PokemonListTemplate from "./components/PokemonListTemplate";
import PokemonListPaginationTemplate from "./components/PokemonListPaginationTemplate";
import PokemonListLoaderTemplate from "./components/PokemonListLoaderTemplate";
import ErrorTemplate from "./components/ErrorTemplate";
import LayoutTemplate from "./components/LayoutTemplate";


function App() {

    function _getPokemonListByPageURL(page) {
        return `${POKEMON_API_BASE_URL}/pokemon?limit=${MAX_POKEMONS_LIMIT}&offset=${page * MAX_POKEMONS_LIMIT}`
    }

    async function _getPokemonListByPage(page) {

        function __getPokemonByURL(url) {
            return fetch(url).then(resp => resp.ok ? resp.json() : null).catch(e => {console.log(`Fetch error on ${url} because of ${e.message}`)})
        }

        const pokemonList = await fetch(_getPokemonListByPageURL(page)).then(r => r.json())
        const richPokemonResults = await Promise.all(pokemonList.results.map(pokemonObject => __getPokemonByURL(pokemonObject.url)))

        const calculatedPageCount = Math.floor(pokemonList.count / MAX_POKEMONS_LIMIT)
        setTotalPages(calculatedPageCount)

        return {
            'count': pokemonList.count,
            'results': richPokemonResults
        }
    }

    /**
     * Handle page change: update querystring on every fire
     * @param {event} e
     * @param {number} page
     * @private
     */
    function _handlePageChange(e, page) {
        setCurrentPage(page)
        const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?page=' + page
        window.history.pushState({path: newUrl},'',newUrl);
    }

    /**
     * Try to get url from query params, if fails => return undefined
     * @return {number | undefined}
     * @private
     */
    function _getPageFromURL() {
        try {
            const pageFromURL = parseInt(window.location.search.split('page=')[1])
            if (pageFromURL >= 0) {
                return pageFromURL
            }
        } catch (e) {
            return undefined
        }
    }

    const [currentPage, setCurrentPage] = useState(_getPageFromURL() || 0)
    const [totalPages, setTotalPages] = useState(null)

    const {data, error} = useSWR(_getPokemonListByPageURL(currentPage), () => _getPokemonListByPage(currentPage))

    if (error) return <ErrorTemplate/>
    return (
        <LayoutTemplate>
            {data ? <PokemonListTemplate data={data.results}/> : <PokemonListLoaderTemplate/>}
            <PokemonListPaginationTemplate count={totalPages} page={currentPage} onChange={_handlePageChange}/>
        </LayoutTemplate>
    );
}

export default App;
