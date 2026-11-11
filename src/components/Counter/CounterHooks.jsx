// import React from "react";
import { useState } from "react";
import { Controls } from '@/components/Controls/Controls.jsx';
import css from "./Counter.module.css";


//! Компонент-клас
export  function CounterHooks({initialValue = 9}) {
    
    const [value, setValue] = useState(initialValue)

    //! Збільшення значення на 1
    const handleIncrement = () => {
        console.log("+1");
        //! Оновлення значення від ПОПЕРЕДНЬОГО
        setValue(prevValue => prevValue + 1);
    };

    //! Зменшення значення на 1
    const handleDecrement = () => {
        console.log("-1");
        //! Оновлення значення від ПОПЕРЕДНЬОГО
       setValue(prevValue => prevValue - 1);
    };

        console.log("-------------------- HOOKS: props & state --------------------");
        console.log("ℹ️initialValue:", initialValue);
        console.log("🔢value:", value);
        console.log("--------------------------------------------------------------");

        return (
            <div className={css.counter}>
                CounterHooks
                <span className={css.counterValue}>{value}</span>

                <Controls
                    onHandleIncrement={handleIncrement}
                    onHandleDecrement={handleDecrement}
                />
            </div>
        )
    
};
