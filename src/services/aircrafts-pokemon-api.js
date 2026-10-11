import axios from "axios";

import { generatesRandomNumber } from "@/utils";

// const pokemonId = generatesRandomNumber(1, 1025)

//* NEW-3 (axios + обробка помилок (формуємо власні помилки) + async/await)
export async function fetchPokemon() {

    const pokemonId = generatesRandomNumber(1, 1025)

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        console.log("🅰️xios==>✅response:", response);
        return response.data;
    } catch (error) {
        //! Помилка: 404
        if (error.response?.status === 404) {
            console.log("🅰️xios==>❌error-404", error);
            throw new Error(`Покемена з id «${pokemonId}» не існує`);
        };
        //! Помилка: 400
        if (error.response?.status === 400) {
            console.log("🅰️xios==>❌error-400:", error);
            throw new Error(`Сталася синтаксична помилка при введенні id «${pokemonId}»`);
        };
        //! Інша помилка
        console.log("🅰️xios==>❌error-(інша помилка):", error);
        throw error;
    };
};