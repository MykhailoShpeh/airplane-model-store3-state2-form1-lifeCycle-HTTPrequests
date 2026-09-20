import React from "react";

import css from './PokemonInfoViewPending.module.css';

export function PokemonInfoViewPending({
    pokemonName
}) {
    return (
        <>
            <h2>
                <u>
                    <i>Ви ввели ім'я покемона</i>
                </u>: <b>{pokemonName}</b>
            </h2>
            <h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>
        </>
    )
}