import React, { Component } from "react";

import css from './FormRegistration.module.css'

const INITIAL_STATE = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userExperience: "discipline",
    userAge: "",
    userLicence: false
};


export class FormRegistration extends Component {

    state = {
        ...INITIAL_STATE
    }



    //! Скидання state в початкове значення INITIAL_STATE
    reset = () => {
        this.setState({ ...INITIAL_STATE });
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log("Підтвердження форми");
        const { loginInputValue, passwordInputValue, userName, userEmail, userPassword, userExperience, userAge, isActive = false, indicesSelectedModels = [] } = this.state;
        console.log(`Login: ${loginInputValue}, Password: ${passwordInputValue}`);
        
        //! Перевірка на унікальність userEmail

        //todo 1. створити змінну users, в яку стягуємо дані з бази даних про користувачів
        //todo 2. створити змінну isEmaiNotlUnique, яка буде мати значення true або false, true, якщо такий userEmail є,
        //todo та false, якщо такого userEmail немає в масиві об'єктів users (для цього потрібно перебрати масив users відповідним перебираючим методом масиву)
        //todo 3. вивести відповідне повідомлення (alert) користувачу, якщо такий email уже існує 

        const users = []

        // this.props.onSubmit({ ...this.state });
        this.props.onSubmit({
            userName,
            userEmail,
            userPassword,
            userExperience,
            userAge,
            isActive,
            indicesSelectedModels
        });
        //! очищуємо поля всіх інпутів
        this.reset()
        // this.props.onClose()
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
            userName,
            userEmail,
            userPassword,
            userExperience,
            userAge,
            userLicence,
        } = this.state

        const {
            onClose
        } = this.props

        console.log("------------STATE FormRegistration------------");
        console.log("userName: ", userName);
        console.log("userEmail: ", userEmail);
        console.log("userPassword: ", userPassword);
        console.log("userExperience: ", userExperience);
        console.log("userAge: ", userAge);
        console.log("userLicence: ", userLicence);
        console.log("onClose: ", onClose);
        console.log("------------------------------------------------------------");


        return (
            <>
                <h2 className={css.titleFormRegistration}>Реєстрація</h2>
                <form
                    className={css.formRegistration}
                    onSubmit={this.handleSubmit}
                >
                    <label className={css.labelFormRegistration}>
                        Ім'я:
                        <input
                            className={css.inputFormRegistration}
                            type="text"
                            name="userName"
                            value={userName}
                            onChange={this.handleChange}
                            required
                        />
                    </label>

                    <label className={css.labelFormRegistration}>
                        E-mail:
                        <input
                            className={css.inputFormRegistration}
                            type="email"
                            name="userEmail"
                            value={userEmail}
                            onChange={this.handleChange}
                            required
                        />
                    </label>


                    <label className={css.labelFormRegistration}>
                        Пароль:
                        <input
                            className={css.inputFormRegistration}
                            type="password"
                            name="userPassword"
                            value={userPassword}
                            onChange={this.handleChange}
                            required
                        />
                    </label>


                    <h3>Ваш досвід:</h3>
                    <div className={css.radioGroupFormRegistration}>
                        <label>
                            Учень
                            <input
                                type="radio"
                                name="userExperience"
                                value="disciple"
                                checked={userExperience === "disciple"}
                                onChange={this.handleChange}

                            />
                        </label>

                        <label>
                            Майстер
                            <input
                                type="radio"
                                name="userExperience"
                                value="master"
                                checked={userExperience === "master"}
                                onChange={this.handleChange}

                            />
                        </label>

                        <label>
                            Гуру
                            <input
                                type="radio"
                                name="userExperience"
                                value="guru"
                                checked={userExperience === "guru"}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <h3>Ваш вік:</h3>
                    <label>
                        {/* Ваш вік */}
                        <select
                            name="userAge"
                            value={userAge}
                            onChange={this.handleChange}
                        >
                            <option value="" disabled>...</option>
                            <option value="18-25">18-25</option>
                            <option value="26-35">26-35</option>
                            <option value="36+">36+</option>
                        </select>
                    </label>

                    {/*//! Згоден з умовами */}
                    <label>
                        Згоден з умовами
                        <input
                            type="checkbox"
                            name="userLicence"
                            checked={userLicence}
                            onChange={this.handleChangeCheckbox}
                        />
                    </label>

                    <div className={css.buttonBoxFormRegistration}>
                        <button
                            className={`${css.buttonFormRegistration} ${css.registrationButton}`}
                            type="submit"
                            disabled={!userLicence} //! блокування кнопки чекбоксом
                        >
                            Submit
                        </button>
                        <button
                            className={`${css.buttonFormRegistration} ${css.cancelButton}`}
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