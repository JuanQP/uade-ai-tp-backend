import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

interface UserData {
  firstName: string,
  lastName: string,
  email: string,
}

interface Address {
    address1: string,
    province: string,
    city: string,
    zip: number,
}

interface Payment {
  cardName: string,
  cardNumber: string,
  expDate: string,
  cvv: number,
  address1: string,
  province: string,
  city: string,
  zip: number
}

interface OrderProduct {
  _id: string,
  img: string,
  marca: string,
  modelo: string,
  precio: number,
  categoria: string,
  interfaz: string,
  nombre: string,
}

interface OrderProductDetail {
  product: OrderProduct,
  quantity: number,
}

export interface BuyOrder {
  user: UserData,
  address: Address,
  payment: Payment,
  products: OrderProductDetail[],
}

interface Order {
  buyOrder: BuyOrder,
  cantidad: number,
  fechacompra: string,
  fechaentrega: string,
  total: number,
  estado: string,
}

const OrderSchema = new mongoose.Schema({
  buyOrder: {
    user: {
      firstName: String,
      lastName: String,
      email: String,
    },
    address: {
      address1: String,
      province: String,
      city: String,
      zip: Number,
    },
    payment: {
      cardName: String,
      cardNumber: String,
      expDate: String,
      cvv: Number,
      address1: String,
      province: String,
      city: String,
      zip: Number
    },
    products: [{
      product: {
        img: String,
        marca: String,
        modelo: String,
        precio: Number,
        categoria: String,
        interfaz: String,
        nombre: String,
      },
      quantity: Number,
    }]
  },
  cantidad: Number,
  fechacompra: String,
  fechaentrega: String,
  total: Number,
  estado: String,
})

export interface OrderDocument extends mongoose.Document, Order {}

OrderSchema.plugin(mongoosePaginate)
const Order = mongoose.model<
  OrderDocument,
  mongoose.PaginateModel<OrderDocument>
>('Order', OrderSchema)

export default Order;
