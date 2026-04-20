import React from 'react';
import { Book } from '../types/Book';
import './BookCard.css';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    return (
        <div className="book-card">
            <div className="book-cover">
                {book.coverImage ? (
                    <img src={book.coverImage} alt={book.title} />
                ) : (
                    <div className="no-cover">Нет обложки</div>
                )}
            </div>
            <h3 className="book-title">{book.title}</h3>
            <p className="book-authors">{book.authors.join(', ')}</p>
        </div>
    );
};

export default BookCard;