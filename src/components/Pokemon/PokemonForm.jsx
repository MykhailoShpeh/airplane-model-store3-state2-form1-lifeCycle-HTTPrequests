import React, { Component } from "react";

// https://www.npmjs.com/package/react-toasti
// https://fkhadra.github.io/react-toastify/introduction/
import { toast } from 'react-toastify'; //! 02.Підлючення/виклик бібліотеки react-toastify
import { ImSearch } from 'react-icons/im';
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
        if (this.state.pokemonName.trim() === '') {
            alert("Введіть ім'я покемона");
            toast.error("Введіть ім'я покемона"); //! 02.Підлючення/виклик бібліотеки react-toastify
            return
        }
        console.log("event: ", event);
        const { pokemonName } = this.state;
        this.props.onSubmit(pokemonName)

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
                    required
                />

                <button
                    className={css.pokemonButton}
                    type="submit"
                >
                    <ImSearch style={{ marginRight: 8 }} />
                    Знайти
                    </button>
            </form>
        )
    }
}