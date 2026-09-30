import React, { Component } from "react";

import aircraftsApi from '@/services/aircrafts-api.js';

import css from './FormIdentification.module.css'

const INITIAL_STATE = {
    userEmail: "",
    userPassword: ""
};

export class FormIdentification extends Component {

    state = {
        ...INITIAL_STATE
    }

    //! Скидання state в початкове значення INITIAL_STATE
    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    //? Метод для отримання масиву користувачів users з json-server: "http://localhost:3000/usersAircrafts"
    loadInitialDataUsers = async (fetchData) => {
        try {
            return fetchData()
        } catch (error) {
            console.log("❌", error);
        };
    };



    handleSubmit = async (event) => {//? робимо метод асинхронним
        event.preventDefault();
        console.log("Підтвердження форми");
        const { userEmail, userPassword } = this.state;
        console.log(`Login: ${userEmail}, Password: ${userPassword}`);
        //! Перевірка на наявність userEmail (Ідентифікація)
        //! 1. Забираємо users з localStorage
        //? const users = JSON.parse(localStorage.getItem('users'));
        const users = await this.loadInitialDataUsers(aircraftsApi.fetchUsersAircrafts); //? завантажуємо "свіженких" users з json-server: "http://localhost:3000/usersAircrafts"
         console.log("users: ", users)
        //! 2. Створюємо змінну, яка дасть відповідь чи є цей користувач
        const isEmail = users.some(user => user.userEmail === userEmail)
        console.log("📩Такий Email є в db?:", isEmail);
        if (!isEmail) {
            alert(`Користувач з таким E-mail: ${userEmail} відсутній☹️`);
            console.log(`Користувач з таким E-mail: ${userEmail} відсутній☹️`);
            return
        }

        //! Перевірка Пароля (Аутентифікація)
        const user = users.find(user => user.userEmail === userEmail)
        console.log("user: ", user)
        if (user.userPassword !== userPassword) {
            alert(`Введений неправильний пароль☹️☹️`);
            console.log(`Введений неправильний пароль☹️☹️`);
            return
        }
        alert(`Вітаю Вас, ${user.userName} 😊 \nІдентифікація/Аутентифікація пройдена ✅`);

        // this.props.onAccountLogin({ ...this.state });
        //! очищуємо поля всіх інпутів
        this.reset()

        // this.props.onClose
    }

    handleChange = event => {
        // console.log("event.currentTarget:", event.currentTarget);
        // console.log("event.currentTarget.name:", event.currentTarget.name);
        // console.log("event.currentTarget.value:", event.currentTarget.value);

        //! Деструктуризуємо:
        const { name, value } = event.currentTarget;

        console.log("Значення name:", name);
        console.log("Значення value:", value);

        // //! Зберігаємо значення інпутів в state
        this.setState({
            //! Використовуємо властивості об'єкта, що обчислюються
            [name]: value,
        });

    };

    handleChangeCheckbox = event => {
        console.log("event.currentTarget.checked:", event.currentTarget.checked);
        //! Деструктуризуємо:
        const { checked } = event.currentTarget;

        this.setState({ userLicence: checked });

    }

    render() {

        const {
            userEmail,
            userPassword,
        } = this.state

        const {
            onClose
        } = this.props

        console.log("------------STATE FormIdentification------------");
        console.log("userEmail: ", userEmail);
        console.log("userPassword: ", userPassword);
        console.log("onClose: ", onClose);
        console.log("------------------------------------------------------------");


        return (
            <>
                <h2 className={css.titleFormIdentification}>Ідентифікація/Аутентифікація</h2>
                <form
                    className={css.formIdentification}
                    onSubmit={this.handleSubmit}
                >
                    <label className={css.labelFormIdentification}>
                        E-mail:
                        <input
                            className={css.inputFormIdentification}
                            type="email"
                            name="userEmail"
                            value={userEmail}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                    <label className={css.labelFormIdentification}>
                        Пароль:
                        <input
                            className={css.inputFormIdentification}
                            type="password"
                            name="userPassword"
                            value={userPassword}
                            onChange={this.handleChange}
                            required
                        />
                    </label>
                    <div className={css.buttonBoxFormIdentification}>
                        <button
                            className={`${css.buttonFormIdentification} ${css.loginButton}`}
                            type="submit"
                            disabled={!userEmail || !userPassword}
                        >
                            Login
                        </button>
                        <button
                            className={`${css.buttonFormIdentification} ${css.cancelButton}`}
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </>
        )
    }
}