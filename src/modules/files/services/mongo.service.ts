import { Injectable, Logger } from '@nestjs/common';
import { MongoFileType } from '../types';
import { FilesCollection } from '../mongo/files.mongo';
import { webcrypto } from 'crypto';
import { MongoService as DataBaseMongoService } from 'src/mongoCore/database/services';
import { ObjectId } from 'mongodb';

@Injectable()
export class MongoService {
  private readonly logger = new Logger(MongoService.name);

  constructor(private readonly mongoService: DataBaseMongoService) {}

  public async generateFileHash(file: Express.Multer.File): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuf = encoder.encode(file.buffer.toString('utf-8'));
    const hashBuffer = await webcrypto.subtle.digest('SHA-256', dataBuf);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  async getFileById(id: string): Promise<MongoFileType> {
    try {
      const file: MongoFileType = (
        await this.mongoService.aggregate(FilesCollection.FILES, [
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          {
            $project: {
              _id: 0,
              nombre: 1,
              archivo_id: '$_id',
              sha256: 1,
              contenedor: 1,
            },
          },
        ])
      )[0] as MongoFileType;
      return file;
    } catch (error) {
      this.logger.error('Error fetching file by ID', error);
      throw new Error('Error fetching file by ID');
    }
  }

  async getFileIdBySha256(sha256: string): Promise<MongoFileType> {
    try {
      const file: MongoFileType = (
        await this.mongoService.aggregate(FilesCollection.FILES, [
          {
            $match: {
              sha256: sha256,
            },
          },
          {
            $project: {
              _id: 0,
              nombre: 1,
              archivo_id: '$_id',
            },
          },
        ])
      )[0] as MongoFileType;
      return file;
    } catch (error) {
      this.logger.error('Error fetching file by SHA256', error);
      throw new Error('Error fetching file by SHA256');
    }
  }

  async saveFile(fileMongo: MongoFileType): Promise<string> {
    try {
      return (
        await this.mongoService.insert(FilesCollection.FILES, fileMongo)
      ).toString();
    } catch (error) {
      this.logger.error('Error saving file', error);
      throw new Error('Error saving file');
    }
  }

  async deleteFile(id: string): Promise<void> {
    try {
      const result = await this.mongoService.delete(FilesCollection.FILES, {
        _id: new ObjectId(id),
      });
      console.log('Delete result:', result);
    } catch (error) {
      this.logger.error('Error deleting file', error);
      throw new Error('Error deleting file');
    }
  }
}
