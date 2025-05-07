import { Injectable, Logger } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { ConfigService } from './../../mongoCore/config/config.service';
import { Configuration } from './../../mongoCore/config/config.key';
import { MailOptions } from 'nodemailer/lib/json-transport';
import * as ejs from 'ejs';
import * as fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class MailsService {
  private readonly logger = new Logger(MailsService.name);
  private readonly transporter: Transporter;

  constructor() {
    const configMongo = new ConfigService();
    this.transporter = createTransport({
      service: 'gmail',
      host: configMongo.get(Configuration.GOOGLE_MAIL_HOST),
      port: Number(configMongo.get(Configuration.GOOGLE_MAIL_PORT)),
      secure: configMongo.get(Configuration.GOOGLE_MAIL_SECURE) === 'true',
      auth: {
        user: configMongo.get(Configuration.GOOGLE_MAIL_USER),
        pass: configMongo.get(Configuration.GOOGLE_MAIL_PASS),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  private async send(
    mail: MailOptions,
    templatePath: string,
    data: ejs.Data,
  ): Promise<any> {
    try {
      const path = join(__dirname, 'templates', templatePath);
      const template = await fs.readFile(path, 'utf-8');
      const html = ejs.render(template, data);
      mail.html = html;
      return new Promise((resolve, reject) => {
        this.transporter.sendMail(mail, (error, info) => {
          if (error) {
            reject(error);
          }
          resolve(info);
        this.logger.log('Email sent: ' + info.response);
        });
      });
    } catch (error) {
      this.logger.error('Error sending email', error);
      throw error;
    }
  }

  async sendWelcomeEmail(email: string, code: string = ''): Promise<any> {
    const mailOptions: MailOptions = {
      to: email,
      subject: 'Bienvenido al sistema de Recursos Humanos',
    };
    const data = {};
    if (code) {
      data['code'] = code;
    }
    return this.send(mailOptions, 'welcome.ejs', data);
  }
}
