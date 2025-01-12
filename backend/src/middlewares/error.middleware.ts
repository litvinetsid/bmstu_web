import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message);

  res.status(500).json({
    success: false,
    data: null,
    meta: {
      message: 'Internal server error',
      details: err.message,
    },
  });
};
