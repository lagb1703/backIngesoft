import { Injectable, Logger } from '@nestjs/common';
import { PaysheetSql } from './sql/paysheet.sql';
import { PlpgsqlService } from './../../newCore/database/services';
import {
  ContractType,
  jobPositionType,
  PaysheetType,
  PaysheetTypeType,
} from './types';
import {
  ContractTypeDto,
  JobPositionDto,
  PaysheetDto,
  PaysheetTypeDto,
} from './dto';

@Injectable()
export class PaysheetService {
  private readonly logger = new Logger(PaysheetService.name);

  constructor(private readonly plpgsqlService: PlpgsqlService) {}

  /**
   * Esta función obtiene todos los tipos de cargos de la base de datos.
   * @returns todos los tipos de cargos en la base de datos postgress.
   * @throws Error si ocurre un error al ejecutar la consulta.
   */
  async getAllJobPosition(): Promise<jobPositionType[]> {
    try {
      const result = await this.plpgsqlService.executeQuery<jobPositionType>(
        PaysheetSql.getAllJobPosition,
        [],
      );
      return result;
    } catch (error) {
      this.logger.error('Error fetching all job positions', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene un tipo de cargo por su id.
   * @param jobPositionId el id del cargo a buscar.
   * @returns el cargo que corresponde al id.
   * @throws Error si ocurre un error al ejecutar la consulta.
   */
  async getJobPositionById(jobPositionId: string): Promise<jobPositionType> {
    try {
      const result = await this.plpgsqlService.executeQuery<jobPositionType>(
        PaysheetSql.getJobPositionById,
        [jobPositionId],
      );
      return result[0];
    } catch (error) {
      this.logger.error('Error fetching job position by ID', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todas las nominas de la base de datos.
   * @returns todas las nominas de la base de datos postgress.
   * @throws Error si ocurre un error al ejecutar la consulta.
   */
  async getAllPaysheet(): Promise<PaysheetType[]> {
    try {
      const result = await this.plpgsqlService.executeQuery<PaysheetType>(
        PaysheetSql.getAllPaysheet,
        [],
      );
      return result;
    } catch (error) {
      this.logger.error('Error fetching all paysheets', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todas las nominas que le pertenecen a un ususario de la base de datos.
   * @param userId el id del ususario a quien le pertenecen las nominas
   * @returns todas las nominas que le pertenecen al usuario.
   */
  async getPaysheetByUserId(userId: number): Promise<PaysheetType[]> {
    try {
      const result = await this.plpgsqlService.executeQuery<PaysheetType>(
        PaysheetSql.getPaysheetByUserId,
        [userId],
      );
      return result;
    } catch (error) {
      this.logger.error('Error fetching paysheet by user ID', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todos los tipos de contrato de la base de datos postgress.
   * @returns todos los tipos de contrato de la base de datos postgress.
   */
  async getAllContractType(): Promise<ContractType[]> {
    try {
      const result = await this.plpgsqlService.executeQuery<ContractType>(
        PaysheetSql.getAllContractType,
        [],
      );
      return result;
    } catch (error) {
      this.logger.error('Error fetching all contract types', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene un tipo de contrato por su id.
   * @param contractTypeId el id del tipo de contrato a buscar.
   * @returns el tipo de contrato que corresponde al id.
   */
  async getContractTypeById(contractTypeId: string): Promise<ContractType> {
    try {
      return (
        await this.plpgsqlService.executeQuery<ContractType>(
          PaysheetSql.getContractTypeById,
          [contractTypeId],
        )
      )[0];
    } catch (error) {
      this.logger.error('Error fetching contract type by ID', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todos los tipos de nomina de la base de datos postgress.
   * @returns todos los tipos de nomina de la base de datos postgress.
   * @throws Error si ocurre un error al ejecutar la consulta.
   */
  async getAllPaysheetType(): Promise<PaysheetTypeType[]> {
    try {
      const result = await this.plpgsqlService.executeQuery<PaysheetTypeType>(
        PaysheetSql.getAllPaysheetType,
        [],
      );
      return result;
    } catch (error) {
      this.logger.error('Error fetching all paysheet types', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene un tipo de nomina por su id.
   * @param paysheetTypeId el id del tipo de nomina a buscar.
   * @returns el tipo de nomina que corresponde al id.
   * @throws Error si ocurre un error al ejecutar la consulta.
   */
  async getPaysheetTypeById(paysheetTypeId: string): Promise<PaysheetTypeType> {
    try {
      return (
        await this.plpgsqlService.executeQuery<PaysheetTypeType>(
          PaysheetSql.getPaysheetTypeById,
          [paysheetTypeId],
        )
      )[0];
    } catch (error) {
      this.logger.error('Error fetching paysheet type by ID', error);
      throw error;
    }
  }

  /**
   * Esta funcion guarda un cargo en la base de datos postgress.
   * @param jobPosition el tipo de cargo a guardar en la base de datos.
   * @returns El id del cargo guardado en la base de datos.
   */
  async saveJobPosition(jobPosition: JobPositionDto): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<JobPositionDto>(
          PaysheetSql.saveJobPosition,
          jobPosition,
        )
      )['p_id'];
    } catch (error) {}
  }

  /**
   * Esta funcion guarda un tipo de contrato en la base de datos postgress.
   * @param contractType el tipo de contrato a guardar en la base de datos.
   * @returns el id del tipo de contrato guardado en la base de datos.
   */
  async saveContractType(contractType: ContractTypeDto): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<ContractTypeDto>(
          PaysheetSql.saveContractType,
          contractType,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error saving contract type', error);
      throw error;
    }
  }

  /**
   * Esta funcion guarda un tipo de nomina en la base de datos postgress.
   * @param paysheetType el tipo de nomina a guardar en la base de datos.
   * @returns el id del tipo de nomina guardado en la base de datos.
   */
  async savePaysheetType(paysheetType: PaysheetTypeDto): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<PaysheetTypeDto>(
          PaysheetSql.savePaysheetType,
          paysheetType,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error saving paysheet type', error);
      throw error;
    }
  }

  /**
   * Esta funcion crea una nomina en la base de datos postgress.
   * @param paysheet la nomina a guardar en la base de datos.
   * @returns el id de la nomina guardada en la base de datos.
   * @throws Error si ocurre un error al ejecutar la consulta.
   */
  async makePaysheet(paysheet: PaysheetDto): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<PaysheetDto>(
          PaysheetSql.makePaysheet,
          paysheet,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error making paysheet', error);
      throw error;
    }
  }

  /**
   * Esta funcion acutaliza un cargo en la base de datos postgress.
   * @param jobPosition la posicion de trabajo a actualizar.
   * @param id el id de la posicion de trabajo a actualizar.
   * @returns void
   */
  async updateJobPosition(
    jobPosition: JobPositionDto,
    id: string,
  ): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<JobPositionDto>(
        PaysheetSql.updateJobPosition,
        jobPosition,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error updating job position', error);
      throw error;
    }
  }

  /**
   * Esta funcion acutaliza una nomina en la base de datos postgress.
   * @param paysheet la nomina a actualizar.
   * @param id el id de la nomina a actualizar.
   * @returns void
   */
  async updatePaysheet(paysheet: PaysheetDto, id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<PaysheetDto>(
        PaysheetSql.updatePaysheet,
        paysheet,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error updating paysheet', error);
      throw error;
    }
  }

  /**
   * Esta funcion acutaliza un tipo de contrato en la base de datos postgress.
   * @param contractType el tipo de contrato a actualizar.
   * @param id el id del tipo de contrato a actualizar.
   */
  async updateContractType(
    contractType: ContractTypeDto,
    id: string,
  ): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<ContractTypeDto>(
        PaysheetSql.updateContractType,
        contractType,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error updating contract type', error);
      throw error;
    }
  }

  /**
   * Esta funcion acutaliza un tipo de nomina en la base de datos postgress.
   * @param paysheetType el tipo de nomina a actualizar.
   * @param id el id del tipo de nomina a actualizar.
   */
  async updatePaysheetType(
    paysheetType: PaysheetTypeDto,
    id: string,
  ): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<PaysheetTypeDto>(
        PaysheetSql.updatePaysheetType,
        paysheetType,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error updating paysheet type', error);
      throw error;
    }
  }

  /**
   * Esta funcion elimina un cargo de la base de datos postgress.
   * @param id el id del cargo a eliminar.
   * @returns void
   */
  async deleteJobPosition(id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        PaysheetSql.deleteJobPosition,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error deleting job position', error);
      throw error;
    }
  }

  /**
   * Esta funcion elimina una nomina de la base de datos postgress.
   * @param id el id de la nomina a eliminar.
   * @returns void
   */
  async deletePaysheet(id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        PaysheetSql.deletePaysheet,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error deleting paysheet', error);
      throw error;
    }
  }

  /**
   * Esta funcion elimina un tipo de contrato de la base de datos postgress.
   * @param id el id del tipo de contrato a eliminar.
   * @returns void
   */
  async deleteContractType(id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        PaysheetSql.deleteContractType,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error deleting contract type', error);
      throw error;
    }
  }

  /**
   * Esta funcion elimina un tipo de nomina de la base de datos postgress.
   * @param id el id del tipo de nomina a eliminar.
   * @returns void
   */
  async deletePaysheetType(id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        PaysheetSql.deletePaysheetType,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error deleting paysheet type', error);
      throw error;
    }
  }
}
