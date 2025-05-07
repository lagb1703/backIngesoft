import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PlpgsqlService } from 'src/newCore/database/services';
import { MailsService } from '../mails/mails.service';
import { UserDto } from './dtos';
import { UserAcountType, RoleType, User } from './types';
import { UserSql } from './sql/user.sql';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly plpgsqlService: PlpgsqlService,
    private readonly mailsService: MailsService,
  ) {}

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

  async getUserByFilters(
    name?: string,
    beforeDate?: string,
    afterDate?: string,
    isVirtual?: string,
    personState?: string,
    roleId?: string,
  ): Promise<User[]> {
    try {
      if (!name && !beforeDate && !afterDate && !isVirtual && !personState && !roleId) {
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
        consulta = consulta.replace(
          ':roleId',
          `rol_id = ${roleId}`,
        );
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
}
