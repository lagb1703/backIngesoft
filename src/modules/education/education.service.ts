import { Injectable } from '@nestjs/common';
import { PlpgsqlService } from 'src/newCore/database/services';
import { EduationSql } from './sql/education.sql';
import { HabilityType, UserHabilityType } from './types';
import { HabilityDto, UserHabilityDto } from './dto';

@Injectable()
export class EducationService {
  constructor(private readonly plpgsqlService: PlpgsqlService) {}

  /**
   * Esta función obtiene todas las habilidades de la base de datos
   * @returns todas la habilidades de la base de datos
   */
  async getHabilities(): Promise<HabilityType[]> {
    try {
      return await this.plpgsqlService.executeQuery<HabilityType>(
        EduationSql.getHabilities,
        [],
      );
    } catch (error) {
      console.log('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta función obtiene todas las habilidades de los usuarios
   * @returns todas las habilidades de los usuarios
   * @description Esta función obtiene todas las habilidades de los usuarios
   */
  async getAllUserHabilities(): Promise<UserHabilityType[]> {
    try {
      return await this.plpgsqlService.executeQuery<UserHabilityType>(
        EduationSql.getAllUserHabilities,
        [],
      );
    } catch (error) {
      console.log('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta función obtiene todas las habilidades de un usuario
   * @param userId id del usuario
   * @description Esta función obtiene todas las habilidades de un usuario
   * @returns Las habilidades del usuario
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async getUserHabilitiesByUserId(userId: number): Promise<UserHabilityType[]> {
    try {
      return await this.plpgsqlService.executeQuery<UserHabilityType>(
        EduationSql.getUserHabilitiesByUserId,
        [userId],
      );
    } catch (error) {
      console.log('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta función guarda una habilidad en la base de datos
   * @param hability habilidad a guardar
   * @description Esta función guarda una habilidad en la base de datos
   * @returns El id de la habilidad guardada
   * @throws Error si ocurre un error al ejecutar la consulta
   */
  async saveHability(hability: HabilityDto): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<HabilityDto>(
          EduationSql.saveHability,
          hability,
        )
      )['p_id'];
    } catch (error) {
      console.log('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta función guarda una habilidad de un usuario en la base de datos
   * @param hability habilidad a editar
   * @param habilityId id de la habilidad a editar
   */
  async updateHability(
    hability: HabilityDto,
    habilityId: string | number,
  ): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<HabilityDto>(
        EduationSql.updateHability,
        hability,
        Number(habilityId),
      );
    } catch (error) {
      console.log('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta función elimina una habilidad de la base de datos
   * @param habilityId id de la habilidad a eliminar
   * @description Esta función elimina una habilidad de la base de datos
   */
  async deleteHability(habilityId: string | number): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        EduationSql.deleteHability,
        Number(habilityId),
      );
    } catch (error) {
      console.log('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  async saveHabilityUser(hability: UserHabilityDto): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<UserHabilityDto>(
          EduationSql.saveHabilityUser,
          hability,
        )
      )['p_id'];
    } catch (error) {
      console.log('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta función edita una habilidad de un usuario en la base de datos
   * @param hability habilidad a de usuario editar
   * @param habilityId id de la habilidad del usuario a editar
   */
  async updatAfinityeHabilityUser(
    afinity: number,
    habilityId: string | number,
  ): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<{ afinity: number }>(
        EduationSql.updatAfinityeHabilityUser,
        { afinity },
        Number(habilityId),
      );
    } catch (error) {
      console.log('Error en el servicio de habilidades', error);
      throw error;
    }
  }
}
