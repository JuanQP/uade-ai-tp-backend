import { Request, Response } from 'express';
import Brand from '../models/Brand.model';

export async function getBrands(_req: Request, res: Response) {
  try {
    const brands = await Brand.find()
    return res.status(200).json({ brands });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}
