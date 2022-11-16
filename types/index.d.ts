declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET?: string
      DATABASE1?: string
      DATABASE2?: string
      DATABASE3?: string
      DATABASE4?: string
      HOST?: string
      PORT?: string
      DATABASE_NAME?: string
      DB_PORT?: string
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


// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
