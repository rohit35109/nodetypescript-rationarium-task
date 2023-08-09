import debug from "debug";
import { Response, Request, NextFunction } from "express";

const log: debug.IDebugger = debug("app:book-middleware");

class BookMiddleware {
  async ValidateCreateBookBodyFields(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { title, author, publishedYear } = req.body;
    title && author && publishedYear
      ? next()
      : res.status(400).send({
          error: "Missing required fields title, author & publishedYear.",
        });
  }

  async ValidateUpdateBookBodyFields(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id, title, author, publishedYear } = req.body;
    id && (title || author || publishedYear)
      ? next()
      : res.status(400).send({
          error: "Missing required fields id && title && author && publishedYear.",
        });
  }

  async extractBookId(req: Request, res: Response, next: NextFunction) {
    req.body.id = req.params.id;
    next();
  }
}

export default new BookMiddleware();
