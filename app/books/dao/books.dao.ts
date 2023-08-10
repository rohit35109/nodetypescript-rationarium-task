import { BookDto } from "./../dto/book.dto";
import shortid from "shortid";
import debug from "debug";
import sequelize from "./../../common/sequelize.config";
import { AppError } from "../../common/app.error";

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
      log(error);
      throw new AppError(500, "An error occurred while adding the book", error);
    }
  }

  async getBooks() {
    try {
      const query = "SELECT * FROM books";
      const result = await sequelize.query(query);
      return result.length ? result[0] : [];
    } catch (error) {
      log(error);
      throw new AppError(500, "An error occurred while fetching the books", error);
    }
  }

  async getBooksById(bookId: string) {
    try {
      const query = "SELECT * FROM books WHERE id = ?";
      const result = await sequelize.query(query, {
        replacements: [bookId],
      });
      if (!result.length || !result[0][0]) {
        throw new AppError(404, "Book not found", null);
      }
      return result[0][0];
    } catch (error) {
      log(error);
      throw new AppError(500, "An error occurred while fetching the book by ID", error);
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
      log(error);
      throw new AppError(500, "An error occurred while updating the book", error);
    }
  }

  async removeBookById(bookId: string) {
    try {
      const query = "DELETE FROM books WHERE id = ?";
      const [result, metaData]: any = await sequelize.query(query, {
        replacements: [bookId],
      });
      if (result[0].affectedRows === 0) {
        throw new AppError(404, "Book not found", null);
      }
      return `${bookId} is removed`;
    } catch (error) {
      log(error);
      throw new AppError(500, "An error occurred while deleteing the book", error);
    }
  }
}

export default new BooksDAO();
