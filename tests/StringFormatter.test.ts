import { describe, it, expect } from 'vitest'
import { capitalizeFirstLetter, trimAndFormat } from '../src/StringFormatter'

describe('capitalizeFirstLetter', () => {

    it('capitalizes first letter', () => {
        expect(capitalizeFirstLetter('hello')).toBe('Hello')
    })

    it('capitalizes and makes uppercase if true', () => {
        expect(capitalizeFirstLetter('hello', true)).toBe('HELLO')
    })

})

describe('trimAndFormat', () => {

    it('trims spaces', () => {
        expect(trimAndFormat('  hello  ')).toBe('hello')
    })

    it('trims and uppercases if true', () => {
        expect(trimAndFormat('  hello  ', true)).toBe('HELLO')
    })

})
