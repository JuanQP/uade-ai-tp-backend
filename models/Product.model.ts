import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import { Product } from 'types'

const ProductSchema = new mongoose.Schema({
  image: String,
  brand: String,
  productModel: String,
  price: Number,
  stock: Number,
  category: String,
  description: String,
  name: String,
})

export interface ProductDocument extends mongoose.Document, Product {}

ProductSchema.plugin(mongoosePaginate)
const Product = mongoose.model<
  ProductDocument,
  mongoose.PaginateModel<ProductDocument>
>('Product', ProductSchema)

export default Product
