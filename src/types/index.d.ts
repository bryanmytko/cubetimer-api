declare global {
  interface ENV {
    MONGO_URL: string | undefined;
    SECRET_TOKEN: string | undefined;
  }

  interface Config {
    MONGO_URL: string;
    SECRET_TOKEN: string;
  }
}

export {}
