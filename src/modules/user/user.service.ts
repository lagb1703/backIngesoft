import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PlpgsqlService } from 'src/newCore/database/services';
import { MailsService } from '../mails/mails.service';
import { UserDto } from './dtos';
import {
  UserAcountType,
  RoleType,
  User,
  UserStateType,
  IdentificationType,
} from './types';
import { UserSql } from './sql/user.sql';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly plpgsqlService: PlpgsqlService,
    private readonly mailsService: MailsService,
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
      console.log(consulta);
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
}
