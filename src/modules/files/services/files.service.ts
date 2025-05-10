import { Injectable, StreamableFile } from '@nestjs/common';
import { ConfigService } from './../../../newCore/config/config.service';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { MongoService } from './mongo.service';
import { MongoFileType } from '../types';
@Injectable()
export class FilesService {
  private s3: S3Client;
  private bucketName: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly mongoService: MongoService,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.get('AWS_BUCKET_NAME');
  }

  async getBasicFilesInfoByIds(ids: string[]): Promise<MongoFileType[]> {
    try {
      const files: MongoFileType[] = await this.mongoService.getFileByIds(ids);
      return files;
    } catch (error) {
      console.error('Error fetching files from S3', error);
      throw new Error('Error fetching files from S3');
    }
  }

  async getBasicFileInfoById(id: string): Promise<MongoFileType> {
    try {
      const fileData: MongoFileType = await this.mongoService.getFileById(id);
      return fileData;
    } catch (error) {
      console.error('Error fetching basic file info from S3', error);
      throw new Error('Error fetching basic file info from S3');
    }
  }

  async getFileById(id: string): Promise<StreamableFile> {
    try {
      const fileData: MongoFileType = await this.mongoService.getFileById(id);
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: `RecursosHumanos/${fileData.sha256}`,
      });
      const data = await this.s3.send(command);
      const buffer: Buffer = Buffer.from(
        await data.Body.transformToByteArray(),
      );
      return new StreamableFile(buffer, {
        type: 'application/octet-stream',
        disposition: `attachment; filename="${fileData.nombre}"`,
      });
    } catch (error) {
      console.error('Error fetching file from S3', error);
      throw new Error('Error fetching file from S3');
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    let objectId: string;
    try {
      const fileHash = await this.mongoService.generateFileHash(file);
      const existingFileId = await this.mongoService.getFileIdBySha256(
        fileHash,
      );
      if (existingFileId) {
        return existingFileId.archivo_id.toString();
      }
      let fileMongo: MongoFileType = {
        nombre: file.originalname,
        contenedor: 's3',
        sha256: fileHash,
      };
      objectId = await this.mongoService.saveFile(fileMongo);
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: `RecursosHumanos/${fileHash}`,
        Body: file.buffer,
      });
      await this.s3.send(command);
      return objectId;
    } catch (error) {
      console.error('Error uploading file to S3', error);
      if (objectId) {
        await this.mongoService.deleteFile(objectId);
      }
      throw new Error('Error uploading file to S3');
    }
  }

  async deleteFile(id: string): Promise<void> {
    try {
      const fileData: MongoFileType = await this.mongoService.getFileById(id);
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: `RecursosHumanos/${fileData.sha256}`,
      });
      await this.s3.send(command);
      await this.mongoService.deleteFile(id);
    } catch (error) {
      console.error('Error deleting file from S3', error);
      throw new Error('Error deleting file from S3');
    }
  }
}
