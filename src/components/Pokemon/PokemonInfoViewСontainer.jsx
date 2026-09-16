import React from "react";

import css from "./PokemonInfoViewСontainer.module.css";

export function PokemonInfoViewСontainer({
  title, children
}) {
    return(
    <div className={css.pokemonInfo}>
       {title && <h1>{title}</h1>}
        {children}
    </div>
    )
}