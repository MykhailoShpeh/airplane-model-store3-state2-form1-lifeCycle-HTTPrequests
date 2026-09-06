import React, { Component } from "react";

import css from './PokemonForm.module.css'

const INITIAL_STATE = {
    pokemonName: "", //! ім'я покемона
}

export class PokemonForm extends Component {
    state = {
        ...INITIAL_STATE
    }

    //! Скидання state в початкове значення INITIAL_STATE
    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    handleSubmit = (event) => {
        event.preventDefault()
        console.log("event: ", event);
        const { pokemonName } = this.state;
        this.props.onSubmit({ pokemonName })

        this.reset()
    }

    handleChange = (event) => {
        //! Деструктуризуємо:
        const { name, value } = event.currentTarget;

        console.log("Значення name:", name);
        console.log("Значення value:", value);

        // //! Зберігаємо значення інпутів в state
        this.setState({
            //! Використовуємо властивості об'єкта, що обчислюються
            [name]: value,
        });
    }

    render() {

        const {
            pokemonName,

        } = this.state

        console.log("----------------------------------------------");
        console.log("🐷 Ім'я покемона:", pokemonName);
        console.log("______________________________________________");


        return (
            <form
                className={css.pokemonForm}
                onSubmit={this.handleSubmit}
            >
                <input
                    className={css.pokemonFormInput}
                    type="text"
                    name="pokemonName"
                    value={pokemonName}
                    onChange={this.handleChange}
                />
                <button
                    className={css.pokemonButton}
                    type="submit"
                >Знайти</button>
            </form>
        )
    }
}