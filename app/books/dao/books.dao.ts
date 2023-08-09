import { BookDto } from "./../dto/book.dto";
import shortid from "shortid";
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class BooksDAO {
    books: Array<BookDto> = [];

    constructor() {
        log("Created new instance of Book DAO");
    }

    async addBook(book: BookDto) {
        book.id = shortid.generate();
        this.books.push(book);
        return book.id;
    }

    async getBooks() {
        return this.books;
    }

    async getBooksById(bookId: string) {
        return this.books.find(book => book.id === bookId);
    }

    async updateBookDetails(existingBook: BookDto) {
        const bookIndex = this.books.findIndex(book => book.id === existingBook.id);
        if (bookIndex < 0) {
            return;
        }
        this.books[bookIndex] = existingBook;
        return this.books[bookIndex];
    }

    async removeBookById(bookId: string) {
        const bookIndex = this.books.findIndex(book => book.id === bookId);
        this.books.splice(bookIndex, 1);
        return `${bookId} is removed`;
    }
}

export default new BooksDAO();