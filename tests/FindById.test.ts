import { describe, it, expect } from 'vitest'
import { findById } from '../src/FindById'

describe('findById', () => {

    const items = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ]

    it('finds item by id', () => {
        const result = findById(items, 2)

        expect(result?.name).toBe('Bob')
    })

    it('returns undefined if not found', () => {
        const result = findById(items, 3)

        expect(result).toBeUndefined()
    })

})
