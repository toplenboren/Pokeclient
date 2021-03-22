import React from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";

import PropTypes from 'prop-types'
import Skeleton from "@material-ui/lab/Skeleton";

const POKEMON_IMAGE_HEIGHT = 200

const cardStyles = makeStyles({
    media: {
        marginTop: '1rem',
        height: POKEMON_IMAGE_HEIGHT,
        width: 'auto',
        backgroundSize: 'contain',
        imageRendering: 'pixelated'
    },
})

/** A skeleton of the card */
function SkeletonCard() {

    const styles = cardStyles()

    return (
        <Card variant={'outlined'}>
            <CardMedia className={styles.media}>
                <Skeleton variant={'rect'} height={POKEMON_IMAGE_HEIGHT}/>
            </CardMedia>
            <CardContent>
                <Typography variant={'h6'}>
                <p>
                    <Skeleton variant={'text'}/>
                </p>
                </Typography>
                <Typography>
                    <Skeleton variant={'text'}/>
                </Typography>
                <Typography>
                    <Skeleton variant={'text'}/>
                </Typography>
            </CardContent>
        </Card>
    )
}

function PokemonCard({name, weight, height, sprites}) {

    const styles = cardStyles()

    return (
        <Card variant={'outlined'}>
            <CardMedia
                className={styles.media}
                image={sprites?.front_default}
                title={name}
            />
            <CardContent>
                <Typography component="h2" variant={'h6'} noWrap>
                    <p title={name}>
                        {name}
                    </p>
                </Typography>
                <Typography>
                    Height: {height}
                </Typography>
                <Typography>
                    Weight: {weight} units
                </Typography>
            </CardContent>
        </Card>
    )
}

export default function PokemonCardTemplate(props) {
    if (props.skeleton) {
        return <SkeletonCard/>
    }
    return <PokemonCard {...props}/>
}

PokemonCardTemplate.propTypes = {
    name: PropTypes.string,
    height: PropTypes.string,
    weight: PropTypes.string,
    sprites: PropTypes.shape({"front_default": PropTypes.string}),
    // Set this to true if you want to display a skeleton of the card, instead of the card
    skeleton: PropTypes.bool
}

PokemonCardTemplate.defaultProps = {
    skeleton: false,
    name: 'unknown'
}
