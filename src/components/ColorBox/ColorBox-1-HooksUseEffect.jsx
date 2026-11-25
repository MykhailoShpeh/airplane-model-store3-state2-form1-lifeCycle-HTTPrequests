import { useState, useEffect } from 'react';
import css from "./ColorBox.module.css";


export function ColorBox1HooksUseEffect({ colorBoxes }) {

    const [activeButtonIdx, setActiveButtonIdx] = useState(null) //! індекс обраного елемента
    const [selectedButtonsIdx, setSelectedButtonsIdx] = useState([]) //! масив індексів обраних елементів
    const [selectedColors, setSelectedColors] = useState([]) //! масив обраних елементів згідно масиву індексів

    //! Формуємо масив обраних елементів(кольорів)
    //todo: var.1
    // const updateSelectedColorElements = (newSelectedButtonsIdx) => {
    //     // this.setState(prevState => ({
    //     //     selectedColors: prevState.selectedButtonsIdx.flatMap(item =>
    //     //         this.props.colorBoxes.filter((el, idx) => idx === item))
    //     // }));

    //     //* New ❓❓❓
    //     //? 1.Формуємо масив обраних елементів selectedColors
    //     console.log("⬅️selectedButtonsIdx:", selectedButtonsIdx);
    //     const newSelectedColors = newSelectedButtonsIdx.flatMap(item =>
    //         colorBoxes.filter((el, idx) => idx === item)
    //     );

    //     console.log("newSelectedColors: ", newSelectedColors);
    //     //? 2.Оновлюємо масив обраних елементів selectedColors
    //     setSelectedColors(newSelectedColors);
    // };


    //! Формуємо та оновлюємо масив обраних елементів(кольорів) з useEffect
    //? ----- ЯК ПРАЦЮЄ ЦЕЙ КОД? -----
    //? Тут одночасно використовуються три важливі механізми React та JavaScript:
    //?     1. useEffect - виконує побічні ефекти після рендеру компонента.
    //?     2. setSelectedColors – оновлює стан компонента.
    //?     3. flatMap() і filter() - формують новий масив вибраних кольорів на основі індексів.
    useEffect(() => {
        const newSelectedColors = selectedButtonsIdx.flatMap(item =>
            colorBoxes.filter((el, idx) => idx === item)
        );

        //? 2.Оновлюємо масив обраних елементів selectedColors
        setSelectedColors(newSelectedColors);
    }, [selectedButtonsIdx, colorBoxes]);

    //? У useEffect є два основних аргументи:
    useEffect(
        () => {
            //! функция эффекта - Перший аргумент
        },
        ["залежності"] //! Другий аргумент
    );
    //? Перший аргумент – функція, яку React виконає після рендеру компонента.
    //? Другий аргумент – масив залежностей, який повідомляє React, 
    //? при зміні яких значень потрібно виконати ефект.
    //? --- Це означає: ---
    //?  - якщо зміниться selectedButtonsIdx, ефект виконається;
    //?  - якщо зміниться colorBoxes, ефект також виконається;
    //?  - якщо обидва значення залишаться незмінними, ефект повторно не виконається.
    //? --- Коли спрацьовує ефект уперше? ---
    //? При першому рендері, 
    //? а також при зміні будь якого елемента з масиву залежностей


    const setActiveIdx = index => {

        let newSelectedButtonsIdx; //! оновлений масив індексів обраних елементів

        //! Перевірка на наявність вже існуючого індексу
        if ((selectedButtonsIdx.find(item => item === index)) === undefined) {
            console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");

            //! Формуємо оновлений масив індексів обраних елементів
            newSelectedButtonsIdx = [...selectedButtonsIdx, index]
                .sort((a, b) => a - b);


            //! Тут використовується об'єктна форма:
            setActiveButtonIdx(index)
            // setSelectedButtonsIdx([...selectedButtonsIdx, index].sort((a, b) => a - b))
            console.log("Індекс активної кнопки:", index);
        } else {
            console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");
            const indexElementRemoved = selectedButtonsIdx.find(item => item === index);

            //! Формуємо оновлений масив індексів обраних елементів
            newSelectedButtonsIdx = selectedButtonsIdx.filter(
                item => item !== index)

            console.log("Індекс видаляемого елемента:", indexElementRemoved);
            //! Тут використовується об'єктна форма setState:
            // setSelectedButtonsIdx(selectedButtonsIdx.filter(item => item !== index))
        };

        //! Оновлюємо масив масив індексів обраних елементів
        setSelectedButtonsIdx(newSelectedButtonsIdx);


        //! Формуємо масив обраних елементів(кольорів)
        // updateSelectedColorElements(newSelectedButtonsIdx);
    };

    console.log("🗝️selectedButtonsIdx: ", selectedButtonsIdx)

    //! Рахуємо кількість обраних кольорів:
    const numberOfColors = selectedButtonsIdx.length;

    console.log("-------------------- ColorBox1HooksNew --------------------");
    console.log("🔘🆔Активна кнопка:", activeButtonIdx);
    console.log("ℹ️Індекси обраних кнопок:", selectedButtonsIdx);
    console.log("Ⓜ️Масив обраних елементів(кольорів):", selectedColors);
    console.log("🔢Кількість обраних кольорів:", numberOfColors);
    console.log("--------------------------------------------------------");


    return (
        <div className={css.mainContainer}>
            {/*//! Блок вибору кольорів */}
            <div className={css.colorBoxContainer}>
                ✅✅ColorBox1HooksUseEffect
                <h2 className={css.colorBoxTitle}>Вибір кольорів</h2>
                <p className={css.colorBoxDescription}>
                    Останній <u>доданий</u> колір:&nbsp;&nbsp;
                    <span
                        className={css.colorBoxSelectedColor}
                        style={{
                            backgroundColor:
                                activeButtonIdx !== null
                                    ? colorBoxes[activeButtonIdx].color
                                    : "transparent"
                        }}
                    >
                        {activeButtonIdx !== null
                            ? colorBoxes[activeButtonIdx].label
                            : ""
                        }
                    </span>
                </p>
                <div className={css.colorBox}>
                    {colorBoxes.map(({ label, color }, index) => (
                        <button
                            key={label}
                            className={css.colorBoxButton}
                            style={{ backgroundColor: color }}
                            onClick={() => setActiveIdx(index)}
                        >
                            {(selectedButtonsIdx.some(value => value === index))
                                ? "✅On"
                                : "🆓Off"
                            }
                        </button>
                    ))}
                </div>
            </div>

            {/*//! Блок обраних кольорів */}
            <div className={css.selectedColorsContainer}>
                <h2 className={css.colorBoxTitle}>Обрані кольори:</h2>
                <p className={css.colorBoxDescription}>
                    Кількість обраних кольорів:
                    <span className={css.colorBoxSelectedColor}>
                        {numberOfColors}
                    </span>
                </p>
                <div className={css.selectedColorsBox}>
                    {selectedColors.map(({ label, color }) => (
                        <div
                            key={label}
                            className={css.selectedColor}
                            style={{ backgroundColor: color }}
                        >
                            {color}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
