import useSWR from 'swr'
import PokemonListTemplate from "./components/PokemonListTemplate";
import PokemonListPaginationTemplate from "./components/PokemonListPaginationTemplate";
import {useState} from "react";
import PokemonListLoaderTemplate from "./components/PokemonListLoaderTemplate";

function App() {

    const MAX_POKEMONS_LIMIT = 12
    const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2'

    const getPokemonListURL = (limit, offset) => (`${POKEMON_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)

    async function getPokemonList(limit, offset) {
        const pokemonList = await fetch(getPokemonListURL(limit, offset)).then(r => r.json())
        const richPokemonResults = await Promise.all(pokemonList.results.map(pokemonObject => fetch(pokemonObject.url).then(r => r.json())))

        const calculatedPageCount = Math.ceil(pokemonList.count / MAX_POKEMONS_LIMIT)
        setTotalPages(calculatedPageCount)

        return {
            'count': pokemonList.count,
            'results': richPokemonResults
        }
    }

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(null)

    const {data, error} = useSWR(getPokemonListURL(MAX_POKEMONS_LIMIT, _calculateOffsetByPage()), () => getPokemonList(MAX_POKEMONS_LIMIT, _calculateOffsetByPage()))

    function _handlePageChange(page) {
        setCurrentPage(page)
    }

    function _calculateOffsetByPage() {
        return currentPage * MAX_POKEMONS_LIMIT
    }

    function _resolvePokemonList() {
        if (data) {
            return <PokemonListTemplate data={data.results}/>
        }
        return <PokemonListLoaderTemplate/>
    }

    if (error) return <div>failed to load</div>
    return (
        <>
            {_resolvePokemonList()}
            <PokemonListPaginationTemplate count={totalPages}
                                           page={currentPage}
                                           onChange={(e, page) => _handlePageChange(page)}/>
        </>
    );
}

export default App;
