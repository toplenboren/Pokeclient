import React from 'react'
import {MAX_POKEMONS_LIMIT} from "../config";
import PokemonListTemplate from "./PokemonListTemplate";

/**
 * Renders a Grid of skeleton cards, identical to the "Healthy" grid
 * @return {JSX.Element}
 * @constructor
 */
export default function PokemonListLoaderTemplate() {

    const fakeData = []

    for (let i = 0; i < MAX_POKEMONS_LIMIT; ++i) {
        fakeData.push({skeleton: true})
    }

    return (
        <PokemonListTemplate data={fakeData}/>
    )
}
