import React, { Component } from "react";

import css from './Pokemoninfo.module.css';

export class PokemonInfo extends Component {
    state = {
        pokemon: null, //! об'єкт з даними про Покемона

    }



    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.pokemonName;
        const nextName = this.props.pokemonName; //! ім'я покемона (оновлене)

        if (prevName != nextName) {
            console.log("❗️Змінилося ім'я ПОКЕМОНА");
            console.log("⏮️prevName (prevProps.pokemonName): ", prevProps.pokemonName);
            console.log("⏭️nextName (this.props.pokemonName): ", this.props.pokemonName);

            //todo робимо запит 
            // fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
            setTimeout(() => {
                fetch(`https://pokeapi.co/api/v2/pokemon/${nextName}`)
                    .then(res => res.json())
                    // .then(pokemon => console.log("pokemon:", pokemon))
                    .then(pokemon => this.setState({ pokemon }))
                // .finally(() => this.setState({ loading: false }));

            }, 2000);
        }
    }

    render() {

        const {
            pokemon
        } = this.state

        console.log("----------------------------------------------");
        console.log("ℹ️🐷 Покемон:", pokemon);
        // console.log("ℹ️⏳ Індикатор завантаження (лоадер):", loading);
        console.log("----------------------------------------------");


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