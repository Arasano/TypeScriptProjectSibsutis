/**
 * @param {string[]} input - массив строк CSV
 * @param {string} delimiter - разделитель полей
 */
export function csvToJSON(input, delimiter) {
    if (!Array.isArray(input) || input.length === 0) {
        throw new Error('Input must be a non-empty array');
    }

    const headers = input[0].split(delimiter);
    const result = [];

    for (let i = 1; i < input.length; i++) {
        const line = input[i];
        if (line.trim() === '') continue; // пропускаем пустые строки
        const values = line.split(delimiter);

        if (values.length !== headers.length) {
            throw new Error(`Invalid CSV at line ${i + 1}: expected ${headers.length} fields, got ${values.length}`);
        }

        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            let value = values[j];
            // попытка преобразовать в число
            if (/^-?\d+(\.\d+)?$/.test(value)) {
                value = Number(value);
            }
            obj[headers[j]] = value;
        }
        result.push(obj);
    }

    return result;
}