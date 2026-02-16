import { describe, it, expect } from 'vitest'
import { createBook } from '../src/Book'

describe('createBook', () => {

    it('creates book with all fields', () => {
        const book = createBook({
            title: '1984',
            author: 'Orwell',
            year: 1949,
            genre: 'fiction'
        })

        expect(book.title).toBe('1984')
        expect(book.year).toBe(1949)
    })

    it('creates book without optional year', () => {
        const book = createBook({
            title: 'Sapiens',
            author: 'Harari',
            genre: 'non-fiction'
        })

        expect(book.year).toBeUndefined()
    })

})
