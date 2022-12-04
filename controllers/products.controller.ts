import { Request, Response } from 'express';
import * as ProductService from '../services/product.service';

export async function getProducts (req: Request, res: Response) {

  // Check the existence of the query parameters, If doesn't exists assign a default value
  const pageNumber = req.query.page ? Number(req.query.page) : 1
  const limitNumber = req.query.limit ? Number(req.query.limit) : 8;
  const { page, limit, ordenamiento, ...rest } = req.query;
  let query: any = { ...rest };
  if (query.search) {
    const searchRegex = new RegExp(query.search, "gi")
    query = {
      $or: [
        { name: searchRegex },
        { category: searchRegex },
        { brand: searchRegex },
      ]
    }
  }
  if(query.pmin) {
    query.price = {
      $gt: Number(query.pmin),
    }
    query.pmin = undefined
  }
  if(query.pmax) {
    query.price = typeof query.price === "object" ? {
      ...query.price,
      $lt: Number(query.pmax),
    } : {
      $lt: Number(query.pmax),
    }
    query.pmax = undefined
  }
  if(query.brand) {
    query.brand = {
      $in: query.brand
    }
  }
  if(query.category) {
    query.category = {
      $in: query.category
    }
  }
  try {
    const sort = ordenamiento == "1" ? "1" : "-1"
    const Products = await ProductService.getProducts(query, sort, pageNumber, limitNumber)
    // Requiere ordenamiento?
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: Products, message: "Succesfully Products Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function getLatestProducts (_req: Request, res: Response) {

  try {
    const Products = await ProductService.getLatestProducts()
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: Products, message: "Succesfully Products Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function getLatestSonido (_req: Request, res: Response) {

  try {
    const Products = await ProductService.getLatestSonido()
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: Products, message: "Succesfully Products Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function getProductById (req: Request, res: Response) {

  // Check the existence of the query parameters, If doesn't exists assign a default value
  const filtro = req.params.id;
  try {
    const Product = await ProductService.getProductById(filtro);
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: Product, message: "Succesfully Product Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function deleteProductsById (req: Request, res: Response) {

  // Check the existence of the query parameters, If doesn't exists assign a default value
  const ids = req.body.ids;
  try {
    const results = await ProductService.deleteProductsById(ids);
    const message = results.deletedCount === 1 ? `Se borró 1 producto` : `Se borraron ${results.deletedCount} productos`;
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({
      status: 200,
      data: results,
      message,
    });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function updateProduct (req: Request, res: Response) {

  // Id is necessary for the update
  if (!req.body._id) {
    return res.status(400).json({ status: 400., message: "ID must be present" })
  }

  const product = {
    ...req.body,
  }
  try {
    const updatedProduct = await ProductService.updateProduct(product);
    return res.status(200).json({ status: 200, data: updatedProduct, message: "Producto modificado." })
  } catch (e: any) {
    return res.status(400).json({ status: 400, message: e.message })
  }
}

export async function createProduct (req: Request, res: Response) {
  // Req.Body contains the form submit values.
  const Product = {
    ...req.body
  };
  try {
    // Calling the Service function with the new object from the Request Body
    const createdProduct = await ProductService.createProduct(Product)
    return res.status(201).json({ status: 201, data: createdProduct, message: "Succesfully Created Product" })
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e)
    return res.status(400).json({ status: 400, message: "Product Creation was Unsuccesfull" })
  }
}

export async function getFilters (_req: Request, res: Response) {

  // Check the existence of the query parameters, If doesn't exists assign a default value
  try {
    const Filters = await ProductService.getFilters();
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: Filters, message: "Succesfully Filters Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}
