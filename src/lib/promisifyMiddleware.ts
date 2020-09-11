/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingMessage, ServerResponse } from 'http';

interface NextFunction {
  (err?: any): void;
}

interface RequestHandler<TReq, TRes> {
  (req: TReq, res: TRes, next: NextFunction): void;
}

interface MiddlewareHandler<T = any> {
  (req: NextApiRequest, res: NextApiResponse<T>): Promise<boolean>;
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function promisifyMiddleware<
  T extends any,
  TReq extends IncomingMessage,
  TRes extends ServerResponse
>(middleware: RequestHandler<TReq, TRes>): MiddlewareHandler<T> {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req as any, res as any, result => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(!res.writableEnded);
      });
    });
}
