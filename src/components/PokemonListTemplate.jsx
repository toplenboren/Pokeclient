import React from "react";
import PropTypes from 'prop-types'
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PokemonCardTemplate from "./PokemonCardTemplate";

/**
 * A component that renders a list of Pokemons :)
 * @constructor
 */
export default function PokemonListTemplate({data}) {

    return (
        <Box py={3}>
            <Grid container spacing={3}>
                {data.map(pokemon => (
                    <Grid item xs={12} sm={6} lg={3} xl={2} zeroMinWidth>
                        <PokemonCardTemplate {...pokemon} />
                    </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

PokemonListTemplate.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
}
