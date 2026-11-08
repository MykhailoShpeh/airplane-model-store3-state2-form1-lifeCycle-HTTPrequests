import { useState } from 'react';
import { Controls } from '@/components/Controls/Controls.jsx'
import css from "./Counter.module.css";


export function CounterReactHooks() {

    const state = useState("A");
    console.log("⁉️state:", state); //! ["A", ƒ]
    //todo: 1 -------------------------------------------
    // const initValue = state[0];
    // const stateChangingFunction = state[1];
    // console.log("initValue:", initValue);

    //todo: 2 -------------------------------------------
    const [initValue, setinitValue] = useState("A");
    console.log("initValue:", initValue);
    //---------------------------------------------------


    const handleClick = () => {
        // stateChangingFunction("B"); //todo: 1
        setinitValue("C"); //todo: 2
    };


    return (
        <div className={css.counter}>
            Hooks
            <p className={css.counterValue}>
                {/* Кількість: {count} */}
            </p>

            <button
                className={css.buttonIncrement}
                type="button"
                onClick={handleClick}
            >
                Збільшити
            </button>

        </div>
    )

}
