import { Request, Response, NextFunction } from "express";
import { appError } from "../errors/appError";
import { JwtPayload, verify } from "jsonwebtoken";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cookie } = req.headers;
  if (!cookie) return;

  const [key, token] = cookie.split("=");
  if (key != process.env.KEY_TOKEN) throw appError("Badly key token!", 401);
  if (!token) throw appError("Token is required!", 401);

  verify(token, process.env.SECRET_TOKEN, (error, decoded) => {
    if (error) {
      throw res.status(401).json({ message: error.message || "token error!" });
    }
    const { id } = decoded as JwtPayload;
    req.userID = id;
    
    return next();
  });
}
