import React from "react";

import css from './PokemonInfoViewData.module.css'

export function PokemonInfoViewData({
pokemon
}) {
  return ( <div className={css.pokemonContainer}>
        <p className={css.pokemonName}><u><i>Покемон</i></u>: <b>{pokemon.name}</b></p>
        <img
            src={pokemon.sprites.other['official-artwork'].front_default} //todo: var.3
            width="300"
            alt={pokemon.name}
        />
    </div>)
}