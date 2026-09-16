import React from "react";

import errorImage from './errorImage.png'

import css from "./PokemonInfoViewError.module.css"

export function PokemonInfoViewError({
errorMessage
}) {
    return (
        <div role="alert">
            <img
                className={css.pokemonInfoErrorImage}
                src={errorImage}
                alt="sadcat"
            />
            <h2 className={css.pokemonInfoTitleError}>{errorMessage}</h2>
        </div>
    )
}