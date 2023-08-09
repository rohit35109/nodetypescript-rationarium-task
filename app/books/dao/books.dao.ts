import { BookDto } from "./../dto/book.dto";
import shortid from "shortid";
import debug from 'debug';
import sequelize from "./../../common/sequelize.config";

const log: debug.IDebugger = debug('app:in-memory-dao');

class BooksDAO {
    books: Array<BookDto> = [];

    constructor() {
        log("Created new instance of Book DAO");
    }

    async addBook({ title, author, publishedYear }: BookDto) {
        const query = "INSERT INTO books (title, author, publishedYear) VALUES (?, ?, ?, ?)";
        const result = await sequelize.query(query, {
            replacements: [title, author, publishedYear]
        });
        return result.length ? result[0] : null;
    }

    async getBooks() {
        const query = "SELECT * FROM books";
        const result = await sequelize.query(query);
        return result;
    }

    async getBooksById(bookId: string) {
        const query = "SELECT * FROM books WHERE id = ?";
        const result = await sequelize.query(query, {
            replacements: [bookId]
        });
        return result.length ? result[0] : null;
    }

    async updateBookDetails({ id, author, publishedYear, title }: BookDto) {

        const query = "UPDATE books SET title = ?, author = ?, publishedYear = ? WHERE id = ?";
        const result = await sequelize.query(query, {
            replacements: [title, author, publishedYear, id]
        });
        return result.length ? result[0] : null;
    }

    async removeBookById(bookId: string) {
        const query = "DELETE FROM books WHERE id = ?";
        await sequelize.query(query, { 
            replacements: [bookId],
        });
        return `${bookId} is removed`;
    }
}

export default new BooksDAO();