import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '@material-ui/lab/Pagination';

export default function PokemonListPaginationTemplate({count, page, onChange}) {
    return <Pagination count={count} page={page} onChange={onChange}/>
}

PokemonListPaginationTemplate.propTypes = {
    // Number of pages
    count: PropTypes.string,
    // CurrentPage
    page: PropTypes.number,
    // Function to be called when page changes (page:number) => {}
    onChange: PropTypes.func
}
