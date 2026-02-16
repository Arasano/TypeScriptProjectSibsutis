import { describe, it, expect } from 'vitest'
import { calculateArea } from '../src/area'

describe('calculateArea', () => {

    it('calculates circle area correctly', () => {
        const result = calculateArea('circle', 2)

        expect(result).toBeCloseTo(12.566, 2)
    })

    it('calculates square area correctly', () => {
        const result = calculateArea('square', 4)

        expect(result).toBe(16)
    })

})
