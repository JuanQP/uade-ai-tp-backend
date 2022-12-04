import mongoose from 'mongoose'

const BrandSchema = new mongoose.Schema({
  id: String,
  description: String,
  imageSrc: String,
})

const Brand = mongoose.model('Brand', BrandSchema)

export default Brand
