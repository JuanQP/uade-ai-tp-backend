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


// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
