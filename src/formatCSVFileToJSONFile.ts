import {csvToJSON} from "./csvToJSON";

import {readFile, writeFile} from 'node:fs/promises';

/**
 * @param {string} input - путь к входному CSV-файлу
 * @param {string} output - путь к выходному JSON-файлу
 * @param {string} delimiter - разделитель полей в CSV
 */
export async function formatCSVFileToJSONFile(input, output, delimiter) {
    try {
        const data = await readFile(input, 'utf8');
        // разбиваем содержимое на строки, удаляем пустые в конце
        const lines = data.split('\n').filter(line => line.trim() !== '');
        if (lines.length === 0) {
            throw new Error('Input file is empty');
        }
        const jsonArray = csvToJSON(lines, delimiter);
        const jsonString = JSON.stringify(jsonArray, null, 2); // форматируем
        await writeFile(output, jsonString, 'utf8');
    } catch (error) {
        throw error;
    }
}