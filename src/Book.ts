export interface Book {
    title: string;
    author: string;
    year?: number;
    genre: 'fiction' | 'non-fiction'; // Union Type — это когда переменная может быть ТОЛЬКО одним из перечисленных значений. Через знак | (или).
}

export function createBook(book: Book): Book {
    return book;
}

// С годом
const book1 = createBook({
    title: "1984",
    author: "Orwell",
    year: 1949,
    genre: "fiction"
});

// Без year — это нормально, потому что year?
const book2 = createBook({
    title: "Sapiens",
    author: "Harari",
    genre: "non-fiction"
});
