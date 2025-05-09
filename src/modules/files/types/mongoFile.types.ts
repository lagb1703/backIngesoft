import { ObjectId } from 'mongodb';

export type MongoFileType = {
    archivo_id?: ObjectId;
    nombre: string;
    contenedor: string;
    sha256?: string;
}