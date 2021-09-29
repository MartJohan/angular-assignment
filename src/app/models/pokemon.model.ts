export interface PokemonResponse {
    next : string,
    previous : string,
    results : Pokemon[]
}

export interface Pokemon {
    name : string,
    url : string,
    id : number
}