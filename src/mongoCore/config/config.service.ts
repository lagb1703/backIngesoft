import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = __dirname + '/../../../.env';
      const existsPath = fs.existsSync(envFilePath);

      if (!existsPath) {
        console.log('El archivo .env no existe');
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        MONGOPORT: process.env.MONGOPORT,
        MONGOHOST: process.env.MONGOHOST,
        MONGOUSERNAME: process.env.MONGOUSERNAME,
        MONGOPASSWORD: process.env.MONGOPASSWORD,
        MONGOURI: process.env.MONGOURI,
        GOOGLE_MAIL_HOST: process.env.GOOGLE_MAIL_HOST,
        GOOGLE_MAIL_PORT: process.env.GOOGLE_MAIL_PORT,
        GOOGLE_MAIL_USER: process.env.GOOGLE_MAIL_USER,
        GOOGLE_MAIL_PASS: process.env.GOOGLE_MAIL_PASS,
        GOOGLE_MAIL_SECURE: process.env.GOOGLE_MAIL_SECURE,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
