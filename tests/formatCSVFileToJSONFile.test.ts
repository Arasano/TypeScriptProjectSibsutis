import { describe, it, expect, vi, beforeEach } from 'vitest';
import { readFile, writeFile } from 'node:fs/promises';
import { formatCSVFileToJSONFile } from '../src/formatCSVFileToJSONFile';

vi.mock('node:fs/promises', () => ({
    readFile: vi.fn(),
    writeFile: vi.fn()
}));

describe('formatCSVFileToJSONFile', () => {
    // Сбрасываем состояние моков перед каждым тестом
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should read file, convert CSV to JSON, and write file', async () => {
        const inputPath = 'input.csv';
        const outputPath = 'output.json';
        const delimiter = ';';
        const fileContent = 'name;age\nJohn;30\nJane;25';
        const expectedJson = JSON.stringify([
            { name: 'John', age: 30 },
            { name: 'Jane', age: 25 }
        ], null, 2);

        // readFile возврат
        vi.mocked(readFile).mockResolvedValue(fileContent);

        await formatCSVFileToJSONFile(inputPath, outputPath, delimiter);

        // readFile правильные аргументы
        expect(readFile).toHaveBeenCalledTimes(1);
        expect(readFile).toHaveBeenCalledWith(inputPath, 'utf8');

        // writeFile правильные аргументы
        expect(writeFile).toHaveBeenCalledTimes(1);
        expect(writeFile).toHaveBeenCalledWith(outputPath, expectedJson, 'utf8');
    });

    it('should throw error if readFile fails', async () => {
        const inputPath = 'input.csv';
        const outputPath = 'output.json';
        const delimiter = ';';
        const error = new Error('File not found');
        vi.mocked(readFile).mockRejectedValue(error);

        await expect(formatCSVFileToJSONFile(inputPath, outputPath, delimiter))
            .rejects.toThrow('File not found');

        expect(writeFile).not.toHaveBeenCalled();
    });

    it('should throw error if csvToJSON throws (invalid CSV)', async () => {
        const inputPath = 'input.csv';
        const outputPath = 'output.json';
        const delimiter = ';';
        const fileContent = 'name;age\nJohn;30;extra'; // некорректный CSV
        vi.mocked(readFile).mockResolvedValue(fileContent);

        await expect(formatCSVFileToJSONFile(inputPath, outputPath, delimiter))
            .rejects.toThrow('Invalid CSV at line 2');

        expect(writeFile).not.toHaveBeenCalled();
    });

    it('should handle empty file', async () => {
        const inputPath = 'input.csv';
        const outputPath = 'output.json';
        const delimiter = ';';
        const fileContent = ''; // пустой файл
        vi.mocked(readFile).mockResolvedValue(fileContent);

        await expect(formatCSVFileToJSONFile(inputPath, outputPath, delimiter))
            .rejects.toThrow('Input file is empty');

        expect(writeFile).not.toHaveBeenCalled();
    });
});