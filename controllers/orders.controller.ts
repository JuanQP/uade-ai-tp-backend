import { Request, Response } from 'express'
import moment from 'moment'
import { BuyOrder } from '../models/Order.model'
import Product from '../models/Product.model'
import * as OrderService from '../services/order.service'

export async function getOrders(req: Request, res: Response) {

  // Check the existence of the query parameters, If doesn't exists assign a default value
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  try {
    const Orders = await OrderService.getOrders({}, page, limit)
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: Orders, message: "Succesfully Orders Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function getOrdersByUser(req: Request, res: Response) {

  // Check the existence of the query parameters, If doesn't exists assign a default value
  const page = req.query.page ? Number(req.query.page) : 1
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  try {
    const Orders = await OrderService.getOrders({ 'buyOrder.user.email': req.email }, page, limit)
    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: Orders, message: "Succesfully Orders Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function getOrderById(req: Request, res: Response) {

  // Check the existence of the query parameters, If doesn't exists assign a default value
  const filtro = req.params.id;
  try {
    const Order = await OrderService.getOrderById(filtro);
    if(!req.isAdmin && Order?.buyOrder.user.email !== req.email) {
      throw new Error("No tenés permisos para ver esta orden de compra")
    }
    if(!Order) throw new Error("La orden no existe")

    // Return the Users list with the appropriate HTTP password Code and Message.
    return res.status(200).json({ status: 200, data: Order, message: "Succesfully Order Recieved" });
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    return res.status(400).json({ status: 400, message: e.message });
  }
}

export async function createOrder(req: Request, res: Response) {
  // Req.Body contains the form submit values.
  const buyOrder: BuyOrder = req.body;
  const errores: Array<string> = [];
  let huboError = false;
  // Nos quedamos con los ids de los productos seleccionados
  const ids = buyOrder.products.map((p) => p.product._id);
  // Me traigo los productos que tienen esos ids
  const db_products = await Product.find({ '_id': { $in: ids } });

  // Checkeamos si hay suficiente stock para TODOS los productos
  buyOrder.products.forEach((p) => {
    const productoActual = db_products.find(db_product => db_product._id == p.product._id);
    if(!productoActual) throw new Error("Producto inexistente");

    if (productoActual.stock < p.quantity) {
      huboError = true;
      errores.push(`El producto ${p.product.name} tiene ${productoActual.stock} unidades disponibles pero se intentó comprar ${p.quantity}.`);
    }
    // Actualizamos el stock pero todavía NO lo guardamos.
    productoActual.stock -= p.quantity;
  });
  // Si hubo error en al menos uno, devolvemos mensaje de error con las cantidades inválidas
  if (huboError) {
    return res.status(400).json({ status: 400, message: errores });
  }
  // Ahora si, creamos la orden...
  const newOrder = {
    buyOrder: buyOrder,
    quantity: buyOrder.products.map(p => p.quantity).reduce((a, b) => (a + b), 0),
    orderDate: moment().format("DD/MM/YYYY"),
    deliveryDate: moment().add(2, "days").format("DD/MM/YYYY"),
    total: buyOrder.products.map(p => p.quantity * p.product.price).reduce((a, b) => (a + b), 0),
    status: 'Pendiente',
  }
  try {
    // Ahora sí updateamos los productos con el nuevo stock modificado.
    db_products.forEach(dbp => dbp.save());
    // Calling the Service function with the new object from the Request Body
    const createdOrder = await OrderService.createOrder(newOrder)
    return res.status(201).json({ createdOrder, message: "Succesfully Created Order" })
  } catch (e: any) {
    //Return an Error Response Message with Code and the Error Message.
    console.log(e)
    return res.status(400).json({ status: 400, message: "Order Creation was Unsuccesfull" })
  }
}

export async function updateOrderStatus(req: Request, res: Response) {

  // Id and status is necessary for the update
  if (!req.body.ids || !req.body.status) {
    return res.status(400).json({ status: 400., message: "No se especificó los IDs o el nuevo Estado." });
  }

  try {
    const updatedOrders = await OrderService.updateOrderStatus(req.body.ids, req.body.status)
    return res.status(200).json({ status: 200, message: `Se modificaron ${updatedOrders.n} órdenes con el nuevo estado ${req.body.status}.` })
  } catch (e: any) {
    return res.status(400).json({ status: 400., message: e.message })
  }
}
