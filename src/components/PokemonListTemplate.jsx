import React from "react";
import PropTypes from 'prop-types'

/**
 * A component that renders a list of Pokemons :)
 * @constructor
 */
export default function PokemonListTemplate({data}) {
    return (data.map(pokemon => (
        <p>{pokemon.name}</p>
    )))
}

PokemonListTemplate.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        'name': PropTypes.string.isRequired,
        'age': PropTypes.string,
        'weight': PropTypes.string
    }))
}
