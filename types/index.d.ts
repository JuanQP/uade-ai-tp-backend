declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET?: string
      DATABASE_URL?: string
      PORT?: string
      UPLOAD_DIR?: string
      NODE_ENV?: string
    }
  }

  declare namespace Express {
    interface Request {
      userId?: string;
      email?: string;
      isAdmin?: boolean;
    }
  }

  type MongoDBSort = -1 | 1
}

export interface UserData {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface Product {
  image: string
  brand: string
  productModel: string
  price: number
  stock: number
  category: string
  description: string
  name: string
}

export interface Address {
  address1: string
  province: string
  city: string
  zip: string
}

export interface CardInfo {
  cardName: string
  cardNumber: string
  expDate: string
  cvv: string
}

export interface Payment {
  cardName: string,
  cardNumber: string,
  expDate: string,
  cvv: string,
  address1: string,
  province: string,
  city: string,
  zip: string
}

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  address: Address,
  payment: CardInfo,
  isAdmin: boolean,
  avatar: string,
}

export type Brand = {
  description: string;
  imageSrc: string;
}

export type Category = {
  description: string;
  imageSrc: string;

}


// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
