import { Pokemon } from "./InterfacePokemonProperties";

export interface PokemonList {
    count:    number;
    next?:     string;
    previous?: null;
    results:  Result[] | Pokemon[];
}

export interface Result {
    name: string;
    url:  string;
}
