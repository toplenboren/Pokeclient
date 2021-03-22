import React, {useState} from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import makeStyles from "@material-ui/core/styles/makeStyles";

import PropTypes from 'prop-types'
import Skeleton from "@material-ui/lab/Skeleton";
import CardActionArea from "@material-ui/core/CardActionArea";

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

/* A normal pokemon card */
function PokemonCard({name, weight, height, sprites}) {

    /**
     * Sometimes we don't have some photos of the pokemon in sprites => for these cases we simply normalize the array
     * @return {[]}
     * @private
     */
    function _normalizeSpritesArray() {
        const result = []

        if (sprites) {
            const spritesArray = Object.values(sprites)
            result.push(sprites.front_default) // A hack — we need to see front of the pokemon on first interaction
            result.push(...spritesArray.filter(x => typeof x === "string"))
        } else {
            result.push(' ')
        }

        return result
    }

    function _incrementPictureIndex() {
        setCurrentPictureIndex(currentPictureIndex => (currentPictureIndex + 1) % normalizedPicturesArray.length)
    }

    const styles = cardStyles()

    const [currentPictureIndex, setCurrentPictureIndex] = useState(0)

    const normalizedPicturesArray = _normalizeSpritesArray()

    return (
        <Card variant={'outlined'}>
            <CardActionArea onClick={_incrementPictureIndex}>
                <CardMedia
                    className={styles.media}
                    image={normalizedPicturesArray[currentPictureIndex]}
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
            </CardActionArea>
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
    height: PropTypes.number,
    weight: PropTypes.number,
    sprites: PropTypes.shape({"front_default": PropTypes.string}),
    // Set this to true if you want to display a skeleton of the card, instead of the card
    skeleton: PropTypes.bool
}

PokemonCardTemplate.defaultProps = {
    skeleton: false,
    name: 'unknown'
}
