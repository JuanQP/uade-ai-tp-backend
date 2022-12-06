import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import { Address, Payment, User } from 'types'
import { ProductDocument } from './Product.model'

interface UserData extends Pick<User, 'firstName' | 'lastName' | 'email'> {}

interface OrderProductDetail {
  product: ProductDocument,
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
  quantity: number,
  orderDate: string,
  deliveryDate: string,
  total: number,
  status: string,
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
      zip: String,
    },
    payment: {
      cardName: String,
      cardNumber: String,
      expDate: String,
      cvv: String,
      address1: String,
      province: String,
      city: String,
      zip: String
    },
    products: [{
      product: {
        image: String,
        brand: String,
        productModel: String,
        price: Number,
        stock: Number,
        category: String,
        description: String,
        name: String,
      },
      quantity: Number,
    }]
  },
  quantity: Number,
  orderDate: String,
  deliveryDate: String,
  total: Number,
  status: String,
})

export interface OrderDocument extends mongoose.Document, Order {}

OrderSchema.plugin(mongoosePaginate)
const Order = mongoose.model<
  OrderDocument,
  mongoose.PaginateModel<OrderDocument>
>('Order', OrderSchema)

export default Order;
