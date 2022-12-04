import { Request, Response } from 'express';
import Category from '../models/Category.model';

export async function getCategories(_req: Request, res: Response) {
  try {
    const categories = await Category.find()
    return res.status(200).json({ categories });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}
