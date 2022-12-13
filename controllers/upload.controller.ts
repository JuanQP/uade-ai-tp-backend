import { Request, Response } from 'express'

export async function uploadProductImage (req: Request, res: Response) {
	res.status(201).send({
		url: `/public/products/${req.file?.filename}`,
	})
}

export async function uploadAvatarImage (req: Request, res: Response) {
	res.status(201).send({
		url: `/public/avatars/${req.file?.filename}`,
	})
}
