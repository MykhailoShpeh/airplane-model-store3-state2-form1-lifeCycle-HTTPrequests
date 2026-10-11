//! Приймає два числа a і b та повертає випадкове число в диапазоні від a до b включно

export function generatesRandomNumber(a, b) {
    const randomNumber = Math.floor(Math.random() * b) + a;
    return randomNumber
}