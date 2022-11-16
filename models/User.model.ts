import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

interface Address {
  address1: string
  province: string
  city: string
  zip: number
}

interface Payment {
  cardName: string
  cardNumber: string
  expDate: string
  cvv: number
}

interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  address: Address,
  payment: Payment,
  isAdmin: boolean,
  isGuest: boolean,
  avatar: string,
}


const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address: {
    address1: { type: String },
    province: { type: String },
    city: { type: String },
    zip: { type: Number }
  },
  payment: {
    cardName: { type: String },
    cardNumber: { type: String },
    expDate: { type: String },
    cvv: { type: Number },
  },
  isAdmin: Boolean,
  isGuest: Boolean,
  avatar: String,
})

export interface UserDocument extends mongoose.Document, User {}

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model<
  UserDocument,
  mongoose.PaginateModel<UserDocument>
>('User', UserSchema)

export default User;
