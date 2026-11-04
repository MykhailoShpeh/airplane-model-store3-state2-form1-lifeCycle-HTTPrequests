import css from '@/components/App/Counter.module.css';
import {Counter} from '@/components/Counter/Counter.jsx'

//* ============================ Принцип замикання в JS (Closure) ============================
//? Замикання (Closure) у JavaScript - це механізм,
//? при якому внутрішня функція зберігає доступ
//? до змінних зовнішньої функції навіть після того,
//? як зовнішня функція завершила виконання.

//? Простіше кажучи:
//? функція пам'ятає область видимості,
//? в якій вона була створена,
//? і може звертатися до змінних
//? із цієї області видимості.

//todo: ======================= 1.Як працю замикання =======================
console.log("🟡1.Як працю замикання");
function outerFunction() {
  const message = '✅ Привіт із innerFunction!';

  function innerFunction() {
    console.log(message);
  };

  return innerFunction;
};

//todo:    Крок 1. Викликаємо зовнішню функцію:
const myFunction = outerFunction();
console.log("myFunction: ", myFunction);
//todo: Всередині outerFunction() створюється змінна:
const message = 'Привіт!';
//todo: А також внутрішня функція innerFunction().

//todo:    Крок 2. Зовнішня функція повертає внутрішню: return innerFunction
//todo: ВАЖЛИВО: ми повертаємо саму функцію, а не результат її виконання.
//todo: Тому тут немає круглих дужок після введенняфункції.

//todo:    Крок 3. Зовнішня функція завершує виконання.
//todo: На погляд може здатися, що змінна message
//todo: повинна зникнути разом із завершенням outerFunction().
//todo: Але це не відбувається: myFunction зберігає доступ
//todo: до лексичного оточення, в якому була створена innerFunction.

//todo:    Крок 4. Викликаємо повернену функцію:
myFunction(); //! ✅ Привіт із innerFunction!
//todo: Вона звертається до message,
//todo: хоча зовнішня функція вже завершила роботу.
console.log("");
//todo: ====================================================================



//! Звичайний компонент
export function AppCounter() {
    return (
        <>
            {/* <div className={css.counter}>
                <span className={css.counterValue}>0</span>
                <div className={css.counterControls}>
                    <button className={css.buttonIncrement}>+ 1</button>
                    <button className={css.buttonDecrement}>- 1</button>
                </div>
            </div> */}



            <Counter />
            <Counter initialValue={10} />
        </>
    );
};
