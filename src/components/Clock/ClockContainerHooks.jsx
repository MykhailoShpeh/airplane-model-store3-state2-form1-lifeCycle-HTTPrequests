import { useState, useEffect } from 'react';
import { ClockHooks } from './ClockHooks.jsx';


export function ClockContainerHooks() {
    const [isClockVisible, setIsClockVisible] = useState(false)

    //! Аналог componentDidMount() / componentDidUpdate()
    useEffect(() => {
        console.log("🟢 ClockContainerHooks: useEffect");
        console.log(`ℹ️ Стан isClockVisible: ${isClockVisible}`);

        //! Функція очищення useEffect
        return () => {console.log("🔴 ClockContainerHooks: cleanup useEffect")};
    }, [isClockVisible]);


    //! Створення та видалення компонента Clock
        const toggleClock = () => {
            console.log("🔘 ClockContainerHooks: toggleClock");
            setIsClockVisible(prevState => !prevState);
        };

    return (
        <div style={{ maxWidth: "50%", display: "grid", margin: "20px auto", padding: 20, outline: "1px solid red" }}>
            <h2
                style={{ color: "darkgreen", textAlign: "center" }}
            >
                Демонстрація componentWillUnmount() на Hooks
            </h2>
            <br />

            <button
                style={{ maxWidth: "50%", height: 50, margin: "0 auto" }}
                type="button"
                onClick={toggleClock}
            >
                {isClockVisible
                    ? "❌ Видалити Clock"
                    : "✅ Створити Clock"
                }
            </button>

            {/*//! Умовне монтування компонента Clock */}
            {isClockVisible && <ClockHooks />}
        </div>
    );
};
