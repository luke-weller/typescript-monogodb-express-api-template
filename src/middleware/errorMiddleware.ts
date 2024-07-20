import { Request, Response, NextFunction } from "express";

interface Error {
  status?: number;
  message?: string;
}

const handleError = (err: Error, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";

  res.status(status).send({
    status,
    message,
  });
};

export default handleError;
