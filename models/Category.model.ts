import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  id: String,
  description: String,
  imageSrc: String,
})

const Category = mongoose.model('Category', CategorySchema)

export default Category
