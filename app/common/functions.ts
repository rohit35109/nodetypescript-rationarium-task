import { Response } from "express";
export const sendResponse = (
  status: number,
  message: string,
  payload: any,
  res: Response
) => {
  res.status(status).json({ status, message, payload });
};
