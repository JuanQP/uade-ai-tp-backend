import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import { User } from 'types'


const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address: {
    address1: { type: String },
    province: { type: String },
    city: { type: String },
    zip: { type: String }
  },
  payment: {
    cardName: { type: String },
    cardNumber: { type: String },
    expDate: { type: String },
    cvv: { type: String },
  },
  isAdmin: Boolean,
  avatar: String,
})

export interface UserDocument extends mongoose.Document, User {}

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model<
  UserDocument,
  mongoose.PaginateModel<UserDocument>
>('User', UserSchema)

export default User;
