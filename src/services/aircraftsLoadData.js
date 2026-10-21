//! Метод-обгортка для отримання даних за допомогою колбек функції fetchData
export async function loadData(fetchData)  {
        try {
            return fetchData()
        } catch (error) {
            console.log("❌", error);
        };
    };