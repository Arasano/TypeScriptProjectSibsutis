// Cоздаём тип ФУНКЦИИ.
// Это не функция. Это описание формы функции.
export type StringFormatter = (
    value: string,
    uppercase?: boolean
) => string;


export const capitalizeFirstLetter: StringFormatter = (
    value,
    uppercase = false
) => {
    const result =
        value.charAt(0).toUpperCase() + value.slice(1);

    return uppercase ? result.toUpperCase() : result;
};


export const trimAndFormat: StringFormatter = (
    value,
    uppercase = false
) => {
    const trimmed = value.trim();
    return uppercase ? trimmed.toUpperCase() : trimmed;
};

