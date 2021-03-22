import React from "react";
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

/**
 * A component that renders a list of Pokemons :)
 * @constructor
 */
export default function PokemonListTemplate({data}) {
    return (
        <Grid container spacing={3}>
            {data.map(pokemon => (
                <Grid item xs={12} sm={6} lg={3} xl={2}>
                    <Card>
                        <CardContent>
                            <img src={pokemon.sprites?.front_default} alt={`${pokemon.name}`}/>
                            <Typography component="h2">
                                <p><b>{pokemon.name}</b></p>
                            </Typography>
                            <Typography>
                                <p>{pokemon.height}</p>
                            </Typography>
                            <Typography>
                                <p>{pokemon.weight}</p>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                ))
            }
        </Grid>
    )
}

PokemonListTemplate.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        'name': PropTypes.string.isRequired,
        'height': PropTypes.string,
        'weight': PropTypes.string,
        'sprites': PropTypes.shape({
            'front_default':PropTypes.string
        })
    }))
}
