import { useState, useEffect } from 'react';
import BookCard from './components/BookCard';
import { Book } from './types/Book';
import './App.css';

function App() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('https://fakeapi.extendsclass.com/books');
                if (!response.ok) {
                    throw new Error('Ошибка при получении книг');
                }
                const booksData: Book[] = await response.json();

                // Загружаем обложки параллельно
                const booksWithCovers = await Promise.all(
                    booksData.map(async (book) => {
                        let coverUrl = null;

                        // Способ 1: Open Library по ISBN
                        if (book.isbn) {
                            try {
                                const cleanIsbn = book.isbn.replace(/[-\s]/g, '');
                                const openLibResponse = await fetch(
                                    `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`
                                );

                                if (openLibResponse.ok) {
                                    coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-M.jpg`;
                                }
                            } catch (err) {
                                console.log(`Open Library не нашла обложку для ISBN ${book.isbn}`);
                            }
                        }

                        // Способ 2: Google Books по названию (если не нашли по ISBN)
                        if (!coverUrl && book.title) {
                            try {
                                const query = encodeURIComponent(`${book.title} ${book.authors[0] || ''}`.substring(0, 100));
                                const googleResponse = await fetch(
                                    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1&key=AIzaSyDxrSLjVbGJz8mR8qQ7VqVqVqVqVqVqVqV`
                                );

                                if (googleResponse.ok) {
                                    const googleData = await googleResponse.json();
                                    if (googleData.items && googleData.items.length > 0) {
                                        coverUrl = googleData.items[0].volumeInfo.imageLinks?.thumbnail ||
                                            googleData.items[0].volumeInfo.imageLinks?.smallThumbnail;
                                    }
                                }
                            } catch (err) {
                                console.log(`Google Books не нашла обложку для "${book.title}"`);
                            }
                        }

                        // Способ 3: Open Library поиск по названию
                        if (!coverUrl && book.title) {
                            try {
                                const query = encodeURIComponent(book.title.substring(0, 50));
                                const searchResponse = await fetch(
                                    `https://openlibrary.org/search.json?title=${query}&limit=1`
                                );

                                if (searchResponse.ok) {
                                    const searchData = await searchResponse.json();
                                    if (searchData.docs && searchData.docs.length > 0 && searchData.docs[0].cover_i) {
                                        coverUrl = `https://covers.openlibrary.org/b/id/${searchData.docs[0].cover_i}-M.jpg`;
                                    }
                                }
                            } catch (err) {
                                console.log(`Open Library search не нашла обложку для "${book.title}"`);
                            }
                        }

                        return { ...book, coverImage: coverUrl };
                    })
                );

                setBooks(booksWithCovers);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Произошла ошибка');
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return (
            <div className="app">
                <h1>Библиотека книг</h1>
                <p className="loading">Загрузка книг...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app">
                <h1>Библиотека книг</h1>
                <p className="error">Ошибка: {error}</p>
            </div>
        );
    }

    return (
        <div className="app">
            <h1>Библиотека книг</h1>
            <div className="books-grid">
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
}

export default App;