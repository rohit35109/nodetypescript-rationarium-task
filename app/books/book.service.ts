import { CRUD } from "../common/crud.interface";
import booksDao from "./dao/books.dao";
import { BookDto } from "./dto/book.dto";

class BookService implements CRUD {
  async list() {
    return booksDao.getBooks();
  }

  async getById(id: string) {
    return booksDao.getBooksById(id);
  }

  async create(resource: BookDto) {
    return booksDao.addBook(resource);
  }

  async deleteById(id: string) {
    return booksDao.removeBookById(id);
  }

  async update(resource: BookDto) {
    return booksDao.updateBookDetails(resource);
  }
}

export default new BookService();
