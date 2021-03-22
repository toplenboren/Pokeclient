import useSWR from 'swr'

function App() {

  const MAX_POKEMONS_LIMIT = 12

  const POKEMON_API_BASE_URL = 'https://pokeapi.co/api/v2'

  const getPokemonListURL = (limit, offset) => (`${POKEMON_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
  const getPokemonURL = (id) => (`${POKEMON_API_BASE_URL}/pokemon/${id}`)

  const getPokemonList = (limit, offset) => fetch(getPokemonListURL(limit,offset)).then(r => r.json())
  const getPokemonFromApi = (id) => fetch(getPokemonURL(id)).then(r => r.json())

  const { data, error } = useSWR(getPokemonListURL, () => getPokemonList(MAX_POKEMONS_LIMIT, 0))

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <>
      hello world! {data.count}
    </>
  );
}

export default App;
