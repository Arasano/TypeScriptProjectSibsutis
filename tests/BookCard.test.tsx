import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BookCard from '../src/components/BookCard'

describe('BookCard', () => {
    const mockBook = {
        id: 1,
        title: 'Test Book',
        isbn: '1234567890',
        pageCount: 300,
        authors: ['Author One', 'Author Two'],
        coverImage: 'https://example.com/cover.jpg'
    }

    it('renders book title', () => {
        render(<BookCard book={mockBook} />)
        expect(screen.getByText('Test Book')).toBeInTheDocument()
    })

    it('renders authors', () => {
        render(<BookCard book={mockBook} />)
        expect(screen.getByText('Author One, Author Two')).toBeInTheDocument()
    })
})