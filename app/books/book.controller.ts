import { Request, Response } from "express";
import bookService from "./book.service";
import debug from "debug";
import { sendResponse } from "../common/functions";

const log: debug.IDebugger = debug("app:book-contraoller");
class BookController {
  async listBook(req: Request, res: Response) {
    const books = await bookService.list();
    sendResponse(200, "Success", books, res);
  }

  async getBookById(req: Request, res: Response) {
    const book = await bookService.getById(req.body.id);
    sendResponse(200, "Success", book, res);
  }

  async createBook(req: Request, res: Response) {
    log(await bookService.create(req.body));
    sendResponse(204, "Book was added sucessfully", null, res);
  }

  async updateBook(req: Request, res: Response) {
    log(await bookService.update(req.body));
    sendResponse(204, "Book was updated sucessfully", null, res);
  }

  async deleteBook(req: Request, res: Response) {
    log(await bookService.deleteById(req.body.id));
    sendResponse(204, "Book was deleted sucessfully", null, res);
  }
}

export default new BookController();
