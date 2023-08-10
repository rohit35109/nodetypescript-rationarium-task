import { Response, Request, NextFunction } from "express";
import { sendResponse } from "./functions";

class CommonMiddleware {
  errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;
    const message = err.message || "An unexpected error occured.";
    const error = err.error || null;
    return sendResponse(status, message, error, res);
  }
}

export default new CommonMiddleware();
