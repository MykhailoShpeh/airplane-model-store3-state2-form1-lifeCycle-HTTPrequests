import axios from "axios"

//? Константи для створення url:
const BASE_URL = "http://localhost:3000/";

const ENDPOINT_AIRCRAFTS_DB = "aircraftsDB"; //* незмінна DB (тільки для читання), для оновлення карток в початковий стан

const ENDPOINT_AIRCRAFTS = "aircrafts";
// const ENDPOINT_AIRCRAFTS = "aircrafts1"; //! ❌ викликає помилку 404

const ENDPOINT_USERS_AIRCRAFTS = "usersAircrafts";
// const ENDPOINT_USERS_AIRCRAFTS = "usersAircrafts1"; //! ❌ викликає помилку 404

const ENDPOINT_USERS_AIRCRAFTS_TEST = "usersAircraftsTest"; //todo: тестова DB для налаштування логіки запитів
// const ENDPOINT_USERS_AIRCRAFTS_TEST = "usersAircraftsTest1"; //! ❌ викликає помилку 404



export async function fetchUsersAircrafts() {
    const url = `${BASE_URL}${ENDPOINT_USERS_AIRCRAFTS_TEST}`; //todo: тестова DB для налаштування логіки запитів

    try {
        const response = await axios.get(`${url}`);
        console.log("🅰️xios==>✅response:", response);
        return response.data;
    } catch (err) {
        console.log("🅰️xios==>❌error-(інша помилка):", err);
        throw err;
    }
}

export async function updateUserSelectedModels(activeUserID, indicesSelectedModels) {
    const url = `${BASE_URL}${ENDPOINT_USERS_AIRCRAFTS_TEST}/${activeUserID}`;

    try {
        const response = await axios.patch(url, {indicesSelectedModels});
        console.log("🅰️xios==>✅response-PATCHusersAircrafts/userId:", response);
        return response.data;
    } catch (err) {
       //! Помилка: Інша помилка
    console.log("🅰️xios==>❌error-PATCHusersAircrafts/userId(Інша помилка):", error);

        throw err;
    }
}

// const api = {
//     fetchUsersAircrafts,
// };

// export default api;