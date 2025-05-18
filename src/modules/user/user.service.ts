import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PlpgsqlService } from 'src/newCore/database/services';
import { MailsService } from '../mails/mails.service';
import { FaultDto, FileUserDto, FileUserTypeDto, UserDto } from './dtos';
import {
  UserAcountType,
  RoleType,
  User,
  UserStateType,
  IdentificationType,
  FileUserTypeType,
  FileUserType,
  FaultType,
} from './types';
import { UserSql } from './sql/user.sql';
import { hash } from 'bcrypt';
import { FilesService } from './../files/services/files.service';
import { MongoFileType } from '../files/types';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly plpgsqlService: PlpgsqlService,
    private readonly mailsService: MailsService,
    private readonly filesService: FilesService,
  ) {}

  /**
   * Esta función obtiene todos los usuarios de la base de datos postgress.
   * @returns Retorna todos los usuarios de la base de datos
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.plpgsqlService.executeQuery<User>(
        UserSql.getAllUsers,
        [],
      );
    } catch (error) {
      this.logger.error('Error al obtener todos los usuarios', error);
      throw error;
    }
  }

  /**
   * Esta función obtiene un usuario por su ID de la base de datos postgress.
   * @param userId id del usuario a buscar
   * @returns el usuario encontrado
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getUserById(userId: number): Promise<User> {
    try {
      return (
        await this.plpgsqlService.executeQuery<User>(UserSql.getUserById, [
          userId,
        ])
      )[0];
    } catch (error) {
      this.logger.error('Error al obtener el usuario por ID', error);
      throw error;
    }
  }

  /**
   * Esta función obtiene un usuario por su identificación de la base de datos postgress.
   * @param identification identificación del usuario a buscar
   * @returns el usuario encontrado
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getUserByIdentification(identification: string): Promise<User> {
    try {
      return (
        await this.plpgsqlService.executeQuery<User>(
          UserSql.getUserByIdentification,
          [identification],
        )
      )[0];
    } catch (error) {
      this.logger.error(
        'Error al obtener el usuario por identificación',
        error,
      );
      throw error;
    }
  }

  /**
   * Esta funcion aplica diversos filtros a la consulta de usuarios
   * @param name nombre del usuario a buscar
   * @param beforeDate fecha despues de la cual se busca el usuario
   * @param afterDate fecha antes de la cual se busca el usuario
   * @param isVirtual el usuario trabaja de forma virtual
   * @param personState estado del usuario a buscar
   * @param roleId Rol del usuario a buscar
   * @returns Los usuarios encontrados con los filtros aplicados
   * @throws Error si ocurre un error al ejecutar la consulta
   * @throws BadRequestException si no se proporcionan filtros
   */
  async getUserByFilters(
    name?: string,
    beforeDate?: string,
    afterDate?: string,
    isVirtual?: string,
    personState?: string,
    roleId?: string,
  ): Promise<User[]> {
    try {
      if (
        !name &&
        !beforeDate &&
        !afterDate &&
        !isVirtual &&
        !personState &&
        !roleId
      ) {
        throw new BadRequestException(
          'No se han proporcionado filtros para la consulta',
        );
      }
      let consulta = UserSql.getUserByFilters.replace(
        ':Conditions',
        'WHERE :name AND :dateA AND :dateB AND :isVirtual AND :personState AND :roleId',
      );
      if (name) {
        consulta = consulta.replace(
          ':name',
          `lower(nombres) || ' ' || lower(apellidos) ILIKE '%${name.toLocaleLowerCase()}%'`,
        );
      } else {
        consulta = consulta.replace(':name', '');
      }
      if (afterDate) {
        consulta = consulta.replace(
          ':dateA',
          `lower(fechaingreso) > '${afterDate}'::date`,
        );
      } else {
        consulta = consulta.replace(' AND :dateA', '');
      }
      if (beforeDate) {
        consulta = consulta.replace(
          ':dateB',
          `lower(fechaingreso) < '${beforeDate}'::date`,
        );
      } else {
        consulta = consulta.replace(' AND :dateB', '');
      }
      if (isVirtual) {
        consulta = consulta.replace(':isVirtual', `virtual = ${isVirtual}`);
      } else {
        consulta = consulta.replace(' AND :isVirtual', '');
      }
      if (personState) {
        consulta = consulta.replace(
          ':personState',
          `estadopersona_id = ${personState}`,
        );
      } else {
        consulta = consulta.replace(' AND :personState', '');
      }
      if (roleId) {
        consulta = consulta.replace(':roleId', `rol_id = ${roleId}`);
      } else {
        consulta = consulta.replace(' AND :roleId', '');
      }
      return await this.plpgsqlService.executeQuery<User>(consulta, []);
    } catch (error) {
      this.logger.error('Error al obtener el usuario por filtros', error);
      throw error;
    }
  }

  /**
   * Esta función guarda un usuario en la base de datos postgress.
   * @param user usuario a guardar
   * @returns el ID del usuario guardado
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async saveUser(user: UserDto): Promise<number> {
    try {
      await this.mailsService.sendWelcomeEmail(user.email);
      const hashedPassword = await hash(user.password, 10);
      user.password = hashedPassword;
      return (
        await this.plpgsqlService.executeProcedureSave<UserDto>(
          UserSql.saveUser,
          user,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error al guardar el usuario', error);
      throw error;
    }
  }

  /**
   * Esta función actualiza un usuario en la base de datos postgress.
   * @param userId ID del usuario a actualizar
   * @param user usuario a actualizar
   */
  async updateUser(userId: string, user: UserDto): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<UserDto>(
        UserSql.updateUser,
        user,
        Number(userId),
      );
    } catch (error) {
      this.logger.error('Error al actualizar el usuario', error);
      throw error;
    }
  }

  /**
   * Esta función elimina permanetemente un usuario de la base de datos postgress.
   * @param userId ID del usuario a eliminar
   */
  async deleteUser(userId: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        UserSql.deleteUser,
        Number(userId),
      );
    } catch (error) {
      this.logger.error('Error al eliminar el usuario', error);
      throw error;
    }
  }

  /**
   * Esta función obtiene un usuario por su correo electrónico de la base de datos postgress.
   * @param email correo electrónico del usuario a buscar
   * @returns el usuario encontrado
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getUserAcountByEmail(email: string): Promise<UserAcountType> {
    try {
      return (
        await this.plpgsqlService.executeQuery<UserAcountType>(
          UserSql.getUserAcountByEmail,
          [email],
        )
      )[0];
    } catch (error) {
      this.logger.error('Error al obtener el usuario por correo', error);
      throw error;
    }
  }

  /**
   * Esta función obtiene un rol por su ID de usuario de la base de datos postgress.
   * @param userId ID del usuario a buscar
   * @returns el rol encontrado
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getRolByUserId(userId: number): Promise<RoleType> {
    try {
      return (
        await this.plpgsqlService.executeQuery<RoleType>(
          UserSql.getRolByUserId,
          [userId],
        )
      )[0];
    } catch (error) {
      this.logger.error('Error al obtener el rol por ID de usuario', error);
      throw error;
    }
  }

  /**
   * Esta función obtiene todos los estados de usuario de la base de datos postgress.
   * @returns todos los estados de los usuarios
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getAllStates(): Promise<UserStateType[]> {
    try {
      return await this.plpgsqlService.executeQuery<UserStateType>(
        UserSql.getAllStates,
        [],
      );
    } catch (error) {
      this.logger.error('Error al obtener todos los estados', error);
      throw error;
    }
  }

  /**
   * Esta función obtiene todos los roles de la base de datos postgress.
   * @returns todos los roles de la base de datos
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getAllRoles(): Promise<RoleType[]> {
    try {
      return await this.plpgsqlService.executeQuery<RoleType>(
        UserSql.getAllRoles,
        [],
      );
    } catch (error) {
      this.logger.error('Error al obtener todos los roles', error);
      throw error;
    }
  }

  /**
   * Esta función obtiene todos los tipos de identificación de la base de datos postgress.
   * @returns todos los tipos de identificación de la base de datos
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getAllIdentificationTypes(): Promise<IdentificationType[]> {
    try {
      return await this.plpgsqlService.executeQuery<IdentificationType>(
        UserSql.getAllIdentificationTypes,
        [],
      );
    } catch (error) {
      this.logger.error(
        'Error al obtener todos los tipos de identificación',
        error,
      );
      throw error;
    }
  }

  /**
   * Esta función obtiene todos los tipos de archivos de la base de datos postgress.
   * @returns todos los tipos de archivos correspondientes a los usuarios de la base de datos
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getAllUserFilesTypes(): Promise<FileUserTypeType[]> {
    try {
      return await this.plpgsqlService.executeQuery<FileUserTypeType>(
        UserSql.getAllUserFilesTypes,
        [],
      );
    } catch (error) {
      this.logger.error('Error al obtener todos los tipos de archivos', error);
      throw error;
    }
  }

  /**
   * Esta función guarda un tipo de archivo de usuario en la base de datos postgress.
   * @param fileType tipo de archivo a guardar
   * @returns El ID del tipo de archivo guardado
   */
  async saveUserFileType(fileType: FileUserTypeDto): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<FileUserTypeDto>(
          UserSql.saveFileUserType,
          fileType,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error(
        'Error al guardar el tipo de archivo del usuario',
        error,
      );
      throw error;
    }
  }

  /**
   * Esta función guarda un tipo de archivo de usuario en la base de datos postgress.
   * @param fileTypeId id del tipo de archivo a actualizar
   * @param fileType tipo de archivo a actualizar
   * @returns void
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async updateUserFileType(
    fileTypeId: string,
    fileType: FileUserTypeDto,
  ): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<FileUserTypeDto>(
        UserSql.updateFileUserType,
        fileType,
        Number(fileTypeId),
      );
    } catch (error) {
      this.logger.error(
        'Error al actualizar el tipo de archivo del usuario',
        error,
      );
      throw error;
    }
  }

  /**
   * Esta función elimina un tipo de archivo de usuario de la base de datos postgress.
   * @param fileTypeId id del tipo de archivo a eliminar
   * @returns void
   */
  async deleteUserFileType(fileTypeId: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        UserSql.deleteFileUserType,
        Number(fileTypeId),
      );
    } catch (error) {
      this.logger.error(
        'Error al eliminar el tipo de archivo del usuario',
        error,
      );
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todos los archivos de usuario de la base de datos postgress.
   * @returns todos los archivos de usuario de la base de datos postgress
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getAllUserFiles(): Promise<FileUserType[]> {
    try {
      return await this.plpgsqlService.executeQuery<FileUserType>(
        UserSql.getAllUserFiles,
        [],
      );
    } catch (error) {
      this.logger.error(
        'Error al obtener todos los archivos de usuario',
        error,
      );
      throw error;
    }
  }

  /**
   * Esta funcion es una implementacion de tipico algoritmo de busqueda binaria
   * @param search Elemento a buscar
   * @param inSearch Array de objectos en el que se buscara
   * @param property propiedad del objecto por el cual se buscara
   * @returns si el objecto buscado esta en el array retornara el indice del objecto en el array,
   * en el caso contrario devolvera null
   */
  async binarySearch<T>(
    search: string | number,
    inSearch: Array<T>,
    property: keyof T,
  ): Promise<number | null> {
    try {
      let begin = 0,
        end = inSearch.length - 1;
      while (begin <= end) {
        let mid = Math.floor((begin + end) / 2);
        if (inSearch[mid] && inSearch[mid][property] == search) return mid;
        if (inSearch[mid] && inSearch[mid][property] > search) end = mid - 1;
        else if (inSearch[mid] && inSearch[mid][property] < search)
          begin = mid + 1;
      }
      return null;
    } catch (err) {
      this.logger.error(err);
      throw Error(err);
    }
  }

  async getAllUserFilesByUserId(
    userId: number,
  ): Promise<(FileUserType & Partial<MongoFileType>)[]> {
    try {
      const filesUser: FileUserType[] =
        await this.plpgsqlService.executeQuery<FileUserType>(
          UserSql.getAllUserFilesByUserId,
          [userId],
        );
      const mongoFiles: MongoFileType[] =
        await this.filesService.getBasicFilesInfoByIds(
          filesUser.map((file) => file.fileId.toString()),
        );
      return Promise.all(
        filesUser.map(async (file) => {
          const index = await this.binarySearch(
            file.fileId,
            mongoFiles,
            'archivo_id',
          );
          if (index !== null) {
            const { archivo_id, ...rest } = mongoFiles[index];
            return { ...file, ...rest };
          }
          return {
            ...file,
            nombre: null,
            contenedor: null,
            sha256: null,
          };
        }),
      );
    } catch (error) {
      this.logger.error(
        'Error al obtener todos los archivos de usuario por ID',
        error,
      );
      throw error;
    }
  }

  /**
   * Esta función sube un archivo de usuario a la base de datos postgress.
   * @param fileUser json que se guarda en la tabla de archivos de usuario
   * @returns el id del archivo de usuario guardado
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  private async uploadUserFile(fileUser: FileUserType): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<FileUserType>(
          UserSql.saveUserFile,
          fileUser,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error al subir el archivo', error);
      throw error;
    }
  }

  /**
   * Esta función vincula un archivo a subir a un usuario en la base de datos postgress.
   * @param file archivo y tipo de archivo a subir
   * @param userId id del usuario al que pertenece el archivo
   * @returns la row de la inserción del archivo en la tabla de archivos de usuario
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async uploadFile(file: FileUserDto, userId: number): Promise<FileUserType> {
    try {
      const fileId = await this.filesService.uploadFile(file.file);
      const fileUser: FileUserType = {
        fileId: fileId,
        fileTypeId: Number(file.fileTypeId),
        userId: userId,
      };
      fileUser.fileUserId = await this.uploadUserFile(fileUser);
      return fileUser;
    } catch (error) {
      this.logger.error('Error al subir el archivo', error);
      throw error;
    }
  }

  private async getUserFilesByUserIdAndFileId(
    userId: number,
    fileId: string,
  ): Promise<FileUserType> {
    try {
      return (
        await this.plpgsqlService.executeQuery<FileUserType>(
          UserSql.getUserFilesByUserIdAndFileId,
          [userId, fileId],
        )
      )[0];
    } catch (error) {
      this.logger.error(
        'Error al obtener los archivos de usuario por ID y archivo',
        error,
      );
      throw error;
    }
  }

  private async deleteUserFile(fileId: number): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        UserSql.deleteUserFile,
        fileId,
      );
    } catch (error) {
      this.logger.error('Error al eliminar el archivo de usuario', error);
      throw error;
    }
  }

  /**
   * Esta función elimina un archivo de usuario de la base de datos postgress.
   * @param fileId id del archivo a eliminar
   * @param userId id del usuario al que pertenece el archivo
   * @returns void
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async deleteFile(fileId: string, userId: number): Promise<void> {
    try {
      const fileUser: FileUserType = await this.getUserFilesByUserIdAndFileId(
        userId,
        fileId,
      );
      if (!fileUser) {
        throw new UnauthorizedException(
          'El archivo no existe o no pertenece al usuario',
        );
      }
      await this.deleteUserFile(fileUser.fileUserId);
      await this.filesService.deleteFile(fileId);
    } catch (error) {
      this.logger.error('Error al eliminar el archivo de usuario', error);
      throw error;
    }
  }

  async getAllFaults(): Promise<FaultType[]> {
    try {
      return await this.plpgsqlService.executeQuery<FaultType>(
        UserSql.getAllFaults,
        [],
      );
    } catch (error) {
      this.logger.error('Error al obtener todas las faltas', error);
      throw error;
    }
  }

  async getFaultById(faultId: string): Promise<FaultType> {
    try {
      return (
        await this.plpgsqlService.executeQuery<FaultType>(
          UserSql.getFaultById,
          [Number(faultId)],
        )
      )[0];
    } catch (error) {
      this.logger.error('Error al obtener la falta por ID', error);
      throw error;
    }
  }

  async getFaultsByUserId(userId: string | number): Promise<FaultType[]> {
    try {
      return await this.plpgsqlService.executeQuery<FaultType>(
        UserSql.getFaultsByUserId,
        [Number(userId)],
      );
    } catch (error) {
      this.logger.error('Error al obtener las faltas por ID de usuario', error);
      throw error;
    }
  }

  async getCurrentsFaultsByUserId(
    userId: string | number,
  ): Promise<FaultType[]> {
    try {
      return await this.plpgsqlService.executeQuery<FaultType>(
        UserSql.getCurrentsFaultsByUserId,
        [userId],
      );
    } catch (error) {
      this.logger.error(
        'Error al obtener las faltas actuales por ID de usuario',
        error,
      );
      throw error;
    }
  }

  async saveFault(fault: FaultDto): Promise<number> {
    try {
      fault.date = `[${fault.startDate},${fault.endDate}]`;
      delete fault.startDate;
      delete fault.endDate;
      return (
        await this.plpgsqlService.executeProcedureSave<FaultDto>(
          UserSql.saveFault,
          fault,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error al guardar la falta', error);
      throw error;
    }
  }

  async updateFault(faultId: string, fault: FaultDto): Promise<void> {
    try {
      fault.date = `[${fault.startDate},${fault.endDate}]`;
      delete fault.startDate;
      delete fault.endDate;
      await this.plpgsqlService.executeProcedureUpdate<FaultDto>(
        UserSql.updateFault,
        fault,
        Number(faultId),
      );
    } catch (error) {
      this.logger.error('Error al actualizar la falta', error);
      throw error;
    }
  }

  async deleteFault(faultId: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        UserSql.deleteFault,
        Number(faultId),
      );
    } catch (error) {
      this.logger.error('Error al eliminar la falta', error);
      throw error;
    }
  }
}
