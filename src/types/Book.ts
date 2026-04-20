export interface Book {
    id: number;
    title: string;
    isbn: string;
    pageCount: number;
    authors: string[];
    coverImage?: string; // URL обложки
}

export function createBook(book: Book): Book {
    return book;
}
