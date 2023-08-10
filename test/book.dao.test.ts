import booksDao from "./../app/books/dao/books.dao";
import { BookDto } from "../app/books/dto/book.dto";
import { AppError } from "../app/common/app.error";

describe("Books DAO", () => {
  it("should throw an error if publishedYear or author or title is missing", async () => {
    const book: Partial<BookDto> = {
      title: "Test Title",
      author: "Test Author",
    };
    await expect(booksDao.addBook(<any>book)).rejects.toThrow(AppError);
  });

  it("should add a book", async () => {
    const book: BookDto = {
      title: "Test Title",
      author: "Test Author",
      publishedYear: 2023,
    };
    const result = await booksDao.addBook(book);
    expect(result).toBe("Book was added");
  });
});

describe("getBooks method", () => {
  it("should retrieve all books", async () => {
    const books = await booksDao.getBooks();
    expect(Array.isArray(books)).toBe(true);
  });
});

describe("getBooksById method", () => {
  it("should retrieve a book by ID", async () => {
    const bookId = "1";
    const book = await booksDao.getBooksById(bookId);
    expect(book).toBeDefined();
  });

  it("should throw an error if the book ID is not found", async () => {
    const invalidId = "1000";
    await expect(booksDao.getBooksById(invalidId)).rejects.toThrow(AppError);
  });
});

describe("updateBookDetails method", () => {
  it("should update a book's details", async () => {
    const book: BookDto = {
      id: "3",
      title: "This is new title",
      author: "This is new author",
      publishedYear: 2010,
    };
    const result = await booksDao.updateBookDetails(book);
    expect(result).toBeDefined();
  });
});

describe("removeBookById method", () => {
  it("should throw an error if the book ID is not found", async () => {
    const invalidId = "2100";
    await expect(booksDao.removeBookById(invalidId)).rejects.toThrow(AppError);
  });
});
