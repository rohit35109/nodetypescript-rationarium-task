import { Request, Response } from "express";
import bookService from "./book.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:book-contraoller");
class BookController {
  async listBook(req: Request, res: Response) {
    const books = await bookService.list();
    res.status(200).send(books);
  }

  async getBookById(req: Request, res: Response) {
    const book = await bookService.getById(req.body.id);
    res.status(200).send(book);
  }

  async createBook(req: Request, res: Response) {
    const bookId = await bookService.create(req.body);
    res.status(201).send(bookId);
  }

  async updateBook(req: Request, res: Response) {
    log(await bookService.update(req.body));
    res.status(204).send();
  }

  async deleteBook(req: Request, res: Response) {
    log(await bookService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new BookController();
