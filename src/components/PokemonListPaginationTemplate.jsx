import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '@material-ui/lab/Pagination';
import Box from "@material-ui/core/Box";

export default function PokemonListPaginationTemplate({count, page, onChange}) {
    return (
        <Box pb={5}>
            <Pagination count={count} page={page} onChange={onChange} size="small" color="primary" shape="rounded"/>
        </Box>
    )
}

PokemonListPaginationTemplate.propTypes = {
    // Number of pages
    count: PropTypes.string,
    // CurrentPage
    page: PropTypes.number,
    // Function to be called when page changes (page:number) => {}
    onChange: PropTypes.func
}
