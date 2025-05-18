import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class FileGeneratorService {

    private readonly basePath: string;
    constructor() {
        this.basePath = process.env.BASE_PATH || './files';
    }

    async generateFile(filename: string, format: string, content: string): Promise<Express.Multer.File> {
        try {
            const file: Express.Multer.File = {
                originalname: filename,
                encoding: 'utf-8',
                mimetype: format,
                buffer: Buffer.from(content),
                size: content.length,
                filename: filename,
            } as Express.Multer.File;
            return file;
        }catch (error) {
            console.error('Error generating file:', error);
            throw error;
        }
    }

    async saveFile(file: Express.Multer.File): Promise<string> {
        try {
            const filePath = `${this.basePath}/${file.originalname}`;
            await fs.writeFile(filePath, file.buffer);
            return filePath;
        } catch (error) {
            console.error('Error saving file:', error);
            throw error;
        }
    }
}
