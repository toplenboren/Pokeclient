import useSWR from 'swr'
import PokemonListTemplate from "./components/PokemonListTemplate";
import PokemonListPaginationTemplate from "./components/PokemonListPaginationTemplate";
import {useState} from "react";
import PokemonListLoaderTemplate from "./components/PokemonListLoaderTemplate";
import {MAX_POKEMONS_LIMIT, POKEMON_API_BASE_URL} from "./config";

function App() {
    function getPokemonListByPageURL(page) {
        return `${POKEMON_API_BASE_URL}/pokemon?limit=${MAX_POKEMONS_LIMIT}&offset=${page * MAX_POKEMONS_LIMIT}`
    }

    async function getPokemonListByPage(page) {
        const pokemonList = await fetch(getPokemonListByPageURL(page)).then(r => r.json())
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

    const {data, error} = useSWR(getPokemonListByPageURL(currentPage), () => getPokemonListByPage(currentPage))

    function _handlePageChange(e, page) {
        setCurrentPage(page)
    }

    if (error) return <div>failed to load</div>
    return (
        <>
            {data ? <PokemonListTemplate data={data.results}/> : <PokemonListLoaderTemplate/>}
            <PokemonListPaginationTemplate count={totalPages}
                                           page={currentPage}
                                           onChange={_handlePageChange}/>
        </>
    );
}

export default App;
