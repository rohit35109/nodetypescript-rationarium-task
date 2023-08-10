import { BookDto } from "./../dto/book.dto";
import shortid from "shortid";
import debug from "debug";
import sequelize from "./../../common/sequelize.config";

const log: debug.IDebugger = debug("app:in-memory-dao");

class BooksDAO {
  books: Array<BookDto> = [];

  constructor() {
    log("Created new instance of Book DAO");
  }

  async addBook({ title, author, publishedYear }: BookDto) {
    try {
      const query =
        "INSERT INTO books (title, author, publishedYear) VALUES (?, ?, ?)";
      await sequelize.query(query, {
        replacements: [title, author, publishedYear],
      });
      return "Book was added";
    } catch (error) {
      throw error;
    }
  }

  async getBooks() {
    try {
      const query = "SELECT * FROM books";
      const result = await sequelize.query(query);
      return result.length ? result[0] : [];
    } catch (error) {
      throw error;
    }
  }

  async getBooksById(bookId: string) {
    try {
      const query = "SELECT * FROM books WHERE id = ?";
      const result = await sequelize.query(query, {
        replacements: [bookId],
      });
      return result.length ? result[0][0] : null;
    } catch (error) {
      throw error;
    }
  }

  async updateBookDetails({ id, author, publishedYear, title }: BookDto) {
    try {
      const query =
        "UPDATE books SET title = ?, author = ?, publishedYear = ? WHERE id = ?";
      const result = await sequelize.query(query, {
        replacements: [title, author, publishedYear, id],
      });
      return result.length ? result[0] : null;
    } catch (error) {
      throw error;
    }
  }

  async removeBookById(bookId: string) {
    try {
      const query = "DELETE FROM books WHERE id = ?";
      await sequelize.query(query, {
        replacements: [bookId],
      });
      return `${bookId} is removed`;
    } catch (error) {
      throw error;
    }
  }
}

export default new BooksDAO();
