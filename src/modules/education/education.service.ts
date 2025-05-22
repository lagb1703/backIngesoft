import { Injectable, Logger } from '@nestjs/common';
import { PlpgsqlService } from 'src/newCore/database/services';
import { MongoService } from 'src/mongoCore/database/services';
import { EduationSql } from './sql/education.sql';
import { EducationType, HabilityType, UserHabilityType } from './types';
import { EducationDto, HabilityDto, UserHabilityDto } from './dto';
import { EducationCollection } from './mongo/education.mongo';
import { ObjectId } from 'mongodb';

@Injectable()
export class EducationService {
  private readonly logger = new Logger(EducationService.name);

  constructor(
    private readonly plpgsqlService: PlpgsqlService,
    private readonly mongoService: MongoService,
  ) {}

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
      this.logger.error('Error en el servicio de habilidades', error);
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
      this.logger.error('Error en el servicio de habilidades', error);
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
      this.logger.error('Error en el servicio de habilidades', error);
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
      this.logger.error('Error en el servicio de habilidades', error);
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
      this.logger.error('Error en el servicio de habilidades', error);
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
      this.logger.error('Error en el servicio de habilidades', error);
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
      this.logger.error('Error en el servicio de habilidades', error);
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
      this.logger.error('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta función obtiene todos los cursos de la base de datos mongo
   * @returns Todos los cursos de la base de datos
   */
  async getAllCourses(): Promise<EducationType[]> {
    try {
      return (await this.mongoService.aggregate(
        EducationCollection.CO_Educacion,
        [
          {
            $project: {
              educationId: '$_id',
              name: '$nombre',
              startDate: '$fechaInicio',
              endDate: '$fechaFinal',
              habilities: '$habilidades',
            },
          },
        ],
      )) as any as EducationType[];
    } catch (error) {
      this.logger.error('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta función guarda un curso en la base de datos mongo
   * @param course curso a guardar
   * @description Esta función guarda un curso en la base de datos
   * @returns retorna el id del curso guardado
   */
  async saveCourse(course: EducationDto): Promise<string> {
    try {
      return (
        await this.mongoService.insert(EducationCollection.CO_Educacion, {
          nombre: course.name,
          fechaInicio: course.startDate,
          fechaFinal: course.endDate,
          habilidades: course.habilities,
        })
      ).toString();
    } catch (error) {
      this.logger.error('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta función edita un curso en la base de datos c
   * @param course curso a editar
   * @param courseId id del curso a editar
   */
  async updateCourse(course: EducationDto, courseId: string): Promise<void> {
    try {
      await this.mongoService.update(
        EducationCollection.CO_Educacion,
        {
          $set: {
            nombre: course.name,
            fechaInicio: course.startDate,
            fechaFinal: course.endDate,
            habilidades: course.habilities,
          },
        },
        { _id: new ObjectId(courseId) },
      );
    } catch (error) {
      this.logger.error('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta función elimina un curso de la base de datos mongo
   * @param courseId id del curso a eliminar
   */
  async deleteCourse(courseId: string): Promise<void> {
    try {
      await this.mongoService.delete(EducationCollection.CO_Educacion, {
        _id: new ObjectId(courseId),
      });
    } catch (error) {
      this.logger.error('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta funcion guarda la asistencia de un usuario a un curso
   * @param userId id del usuario
   * @param courseId id del curso
   * @description Esta función guarda la asistencia de un usuario a un curso
   */
  async saveAssitence(
    userId: number | string,
    courseId: string,
  ): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureSave(
        EduationSql.saveAssitence,
        { userId, courseId },
      );
    } catch (error) {
      this.logger.error('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta funcion desvincula un curso de un usuario
   * @param userId id del usuario
   * @param courseId id del curso
   */
  async linkCourse(userId: number | string, courseId: string): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave(EduationSql.linkCourse, {
          userId,
          courseId,
        })
      )['p_id'];
    } catch (error) {
      this.logger.error('Error en el servicio de habilidades', error);
      throw error;
    }
  }

  /**
   * Esta funcion desvincula un curso de un usuario
   * @param userId id del usuario
   * @param courseId id del curso
   */
  async unlinkCourse(usercourseId: string | number): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        EduationSql.unlinkCourse,
        Number(usercourseId),
      );
    } catch (error) {
      this.logger.error('Error en el servicio de habilidades', error);
      throw error;
    }
  }
}
