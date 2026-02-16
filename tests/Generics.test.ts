import { describe, it, expect } from 'vitest'
import { getFirstElement } from '../src/Generics'

describe('getFirstElement', () => {

    it('returns first number', () => {
        expect(getFirstElement([1, 2, 3])).toBe(1)
    })

    it('returns first string', () => {
        expect(getFirstElement(['a', 'b'])).toBe('a')
    })

    it('returns undefined for empty array', () => {
        expect(getFirstElement([])).toBeUndefined()
    })

})
