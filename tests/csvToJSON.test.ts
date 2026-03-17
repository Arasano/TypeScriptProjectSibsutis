import { describe, it, expect } from 'vitest';
import { csvToJSON } from '../src/csvToJSON';

describe('csvToJSON', () => {
    it('should convert valid CSV to array of objects', () => {
        const input = ['name;age;city', 'John;30;New York', 'Jane;25;London'];
        const delimiter = ';';
        const expected = [
            { name: 'John', age: 30, city: 'New York' },
            { name: 'Jane', age: 25, city: 'London' }
        ];
        expect(csvToJSON(input, delimiter)).toEqual(expected);
    });

    it('should handle different delimiters', () => {
        const input = ['name,age,city', 'John,30,New York', 'Jane,25,London'];
        const delimiter = ',';
        const expected = [
            { name: 'John', age: 30, city: 'New York' },
            { name: 'Jane', age: 25, city: 'London' }
        ];
        expect(csvToJSON(input, delimiter)).toEqual(expected);
    });

    it('should convert numeric strings to numbers', () => {
        const input = ['a;b;c', '1;2;3', '4;5;6'];
        const delimiter = ';';
        const expected = [
            { a: 1, b: 2, c: 3 },
            { a: 4, b: 5, c: 6 }
        ];
        expect(csvToJSON(input, delimiter)).toEqual(expected);
    });

    it('should keep non-numeric strings as strings', () => {
        const input = ['col1;col2', 'abc;def', '123;456'];
        const delimiter = ';';
        const expected = [
            { col1: 'abc', col2: 'def' },
            { col1: 123, col2: 456 }
        ];
        expect(csvToJSON(input, delimiter)).toEqual(expected);
    });

    it('should throw error if number of fields mismatch', () => {
        const input = ['h1;h2', 'val1;val2;val3']; // лишнее поле
        const delimiter = ';';
        expect(() => csvToJSON(input, delimiter)).toThrowError('Invalid CSV at line 2: expected 2 fields, got 3');
    });

    it('should throw error if input is empty array', () => {
        expect(() => csvToJSON([], ';')).toThrowError('Input must be a non-empty array');
    });

    it('should skip empty lines after header', () => {
        const input = ['h1;h2', 'a;b', '', 'c;d'];
        const delimiter = ';';
        const expected = [
            { h1: 'a', h2: 'b' },
            { h1: 'c', h2: 'd' }
        ];
        expect(csvToJSON(input, delimiter)).toEqual(expected);
    });
});