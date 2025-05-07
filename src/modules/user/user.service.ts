import { Injectable, Logger } from '@nestjs/common';
import { PlpgsqlService } from 'src/newCore/database/services';
import { UserDto } from './dtos';
import { UserAcountType, RoleType, User } from './types';
import { UserSql } from './sql/user.sql';
import {hash} from 'bcrypt';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly plpgsqlService: PlpgsqlService) {}

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

  async saveUser(user: UserDto): Promise<number> {
    try {
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
