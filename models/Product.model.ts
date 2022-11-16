import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

interface Product {
  img: string
  marca: string
  modelo: string
  peso: string
  precio: number
  stock: number
  categoria: string
  descripcion: string
  interfaz: string
  nombre: string
}

const ProductSchema = new mongoose.Schema({
  img: String,
  marca: String,
  modelo: String,
  peso: String,
  precio: Number,
  stock: Number,
  categoria: String,
  descripcion: String,
  interfaz: String,
  nombre: String,
})

export interface ProductDocument extends mongoose.Document, Product {}

ProductSchema.plugin(mongoosePaginate)
const Product = mongoose.model<
  ProductDocument,
  mongoose.PaginateModel<ProductDocument>
>('Product', ProductSchema)

export default Product
