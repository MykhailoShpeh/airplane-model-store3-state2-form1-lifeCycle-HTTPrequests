import React, { Component } from "react";

import css from './Pokemoninfo.module.css';

export class PokemonInfo extends Component {
    state = {

    }



    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.pokemonName;
        const nextName = this.props.pokemonName; //! ім'я покемона (оновлене)

        if (prevName != nextName) {
            console.log("❗️Змінилося ім'я ПОКЕМОНА");
            console.log("⏮️prevName (prevProps.pokemonName): ", prevProps.pokemonName);
            console.log("⏭️nextName (this.props.pokemonName): ", this.props.pokemonName);
        }
    }

    render() {
        return (
            <div className={css.pokemonInfo}>
                <h1>PokemonInfo</h1>
                <h2><i>Введіть ім'я покемона</i></h2>
                <h2><u><i>Ви ввели ім'я покемона</i></u>: <b>???</b></h2>
                <h2 className={css.pokemonInfoLoading}>Завантажуємо покемон...</h2>
                <div className={css.pokemonContainer}>
                    <p>Покемон: <span className={css.pokemonName}></span></p>
                    <img src="./" alt="pokemon" />
                </div>
            </div>
        )
    }

}