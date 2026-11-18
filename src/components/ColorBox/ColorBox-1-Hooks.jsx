import { useState } from 'react';
import css from "./ColorBox.module.css";


export function ColorBox1Hooks({colorBoxes}) {

    const [activeButtonIdx, setActiveButtonIdx] = useState(null) //! індекс обраного елемента
    const [selectedButtonsIdx, setSelectedButtonsIdx] = useState([]) //! масив індексів обраних елементів
    const [selectedColors, setSelectedColors] = useState([]) //! масив обраних елементів згідно масиву індексів

    //! Формуємо масив обраних елементів(кольорів)
    //todo: var.1
    const updateSelectedColorElements = () => {
        // this.setState(prevState => ({
        //     selectedColors: prevState.selectedButtonsIdx.flatMap(item =>
        //         this.props.colorBoxes.filter((el, idx) => idx === item))
        // }));

        //* New ❓❓❓
        //! ---------- АЛЕ ТАК НЕ ПРАЦЮЄ ВІРНО, ЧОМУ? ----------
        //! 1. Початковий стан: 
        //! selectedButtonsIdx = [], selectedColors = []
        //! 2. Користувач натискає кнопку №2 і
        //! викликається setSelectedButtonsIdx([2]) і selectedButtonsIdx = [2].
        //! 3. Потім відразу викликається функція updateSelectedColorElements(), 
        //! але функція updateSelectedColorElements() використовую ще старий масив: selectedButtonsIdx = [], 
        //! тому selectedcolors залишається порожнім.
        //! 4. Далі React виконує повторний рендер і
        //! selectedButtonsIdx = [2], але selectedColors = [].
      //? 1.Формуємо масив обраних елементів selectedColors
        console.log("⬅️selectedButtonsIdx:", selectedButtonsIdx);
        //! Тут значення змінної selectedbuttonsidx в поточному рендері ще не змінюється.
        const newSelectedColors = selectedButtonsIdx.flatMap(item =>
            colorBoxes.filter((el, idx) => idx === item)
        );

        console.log("newSelectedColors: ", newSelectedColors);
        //? 2.Оновлюємо масив обраних елементів selectedColors
        setSelectedColors(newSelectedColors);
    };



    const setActiveIdx = index => {
        //! Перевірка на наявність вже існуючого індексу
        if ((selectedButtonsIdx.find(item => item === index)) === undefined) {
            console.log("Такого індекса ще немає,тоді ДОДАЄМО його!✅");
            //! Тут використовується об'єктна форма setState:
            // this.setState({
            //     activeButtonIdx: index,
            //     selectedButtonsIdx: [...this.state.selectedButtonsIdx, index].sort((a, b) => a - b), //todo-1 ✅
            // });
            setActiveButtonIdx(index)
            setSelectedButtonsIdx([...selectedButtonsIdx, index].sort((a, b) => a - b))
            console.log("Індекс активної кнопки:", index);
        } else {
            console.log("Такий індекс вже є,тоді ВИДАЛЯЄМО його!❌");
            const indexElementRemoved = selectedButtonsIdx.find(item => item === index);
            console.log("Індекс видаляемого елемента:", indexElementRemoved);
            //! Тут використовується об'єктна форма setState:
            // this.setState({
            //     selectedButtonsIdx: this.state.selectedButtonsIdx.filter(item => item !== index),
            // });
            setSelectedButtonsIdx(selectedButtonsIdx.filter(item => item !== index))
        };

        //! Формуємо масив обраних елементів(кольорів)
        updateSelectedColorElements();
    };

    console.log("🗝️selectedButtonsIdx: ", selectedButtonsIdx)

    //! Рахуємо кількість обраних кольорів:
    const numberOfColors = selectedButtonsIdx.length;

    console.log("-------------------- ColorBox1Hooks --------------------");
    console.log("🔘🆔Активна кнопка:", activeButtonIdx);
    console.log("ℹ️Індекси обраних кнопок:", selectedButtonsIdx);
    console.log("Ⓜ️Масив обраних елементів(кольорів):", selectedColors);
    console.log("🔢Кількість обраних кольорів:", numberOfColors);
    console.log("--------------------------------------------------------");


    return (
        <div className={css.mainContainer}>
            {/*//! Блок вибору кольорів */}
            <div className={css.colorBoxContainer}>
                ❌ColorBox1Hooks
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
