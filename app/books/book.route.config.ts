import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import bookController from "./book.controller";
import bookMiddleware from "./middleware/book.middleware";

export class BookRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "BookRoutes");
  }

  configureRoute(): express.Application {
    this.app
      .route("/books")
      .get(bookController.listBook)
      .post(bookMiddleware.ValidateBookBodyFields, bookController.createBook);

    this.app.param("id", bookMiddleware.extractBookId);

    this.app
      .route("/books/:id")
      .get(bookController.getBookById)
      .put(bookMiddleware.ValidateBookBodyFields, bookController.updateBook)
      .delete(bookController.deleteBook);

    return this.app;
  }
}
