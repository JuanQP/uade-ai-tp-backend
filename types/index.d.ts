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
  zip: number
}

export interface CardInfo {
  cardName: string
  cardNumber: string
  expDate: string
  cvv: number
}

export interface Payment {
  cardName: string,
  cardNumber: string,
  expDate: string,
  cvv: number,
  address1: string,
  province: string,
  city: string,
  zip: number
}

export interface User {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  address: Address,
  payment: CardInfo,
  isAdmin: boolean,
  isGuest: boolean,
  avatar: string,
}


// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
