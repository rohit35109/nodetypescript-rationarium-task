import { Response, Request, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../../common/functions";

class BookMiddleware {
  public bookSchema = Joi.object({
    id: Joi.number().optional(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    publishedYear: Joi.number().required(),
  });

  ValidateBookBodyFields = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = this.bookSchema.validate(req.body);
    if (error) return sendResponse(400, error.details[0].message, null, res);
    next();
  };

  extractBookId = async (req: Request, res: Response, next: NextFunction) => {
    req.body.id = req.params.id;
    next();
  };
}

export default new BookMiddleware();
