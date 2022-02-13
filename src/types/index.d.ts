declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN_SECRET: string;
      MONGO_URL: string;
    }
  }
  
  interface ENV {
    TOKEN_SECRET: string | undefined;
    MONGO_URL: string | undefined;
  }
  
  interface Config {
    TOKEN_SECRET: string;
    MONGO_URL: string;
  }

  interface JwtPayload {
    data: string;
  }

  interface UserType {
    _id: string
  }

  namespace Express {
    interface Request {
        user?: string
    }

    interface Headers {
      authorization: string;
    }
  }
}

export {}
