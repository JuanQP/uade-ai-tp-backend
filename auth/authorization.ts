import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default function authorization(req: Request, res: Response, next: NextFunction) {

  const token = req.headers['x-access-token'] ?? req.cookies['_auth']

  try {
    const sec = process.env.SECRET
    if(typeof token !== "string" || typeof sec !== "string") {
      throw new Error("Token inválido")
    }
    const decoded = jwt.verify(token, sec) as jwt.JwtPayload
    req.userId = decoded.id
    req.email = decoded.email
    next()
  } catch (error: any) {
    res.status(401).send({ message: error.message })
  }
}
