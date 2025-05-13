import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PaysheetSql } from './sql/paysheet.sql';
import { PlpgsqlService } from './../../newCore/database/services';
import {
  ConceptType,
  ConceptTypeType,
  ContractType,
  jobPositionType,
  NoveltyType,
  PaymentType,
  PaysheetType,
  PaysheetTypeType,
} from './types';
import {
  ConceptDto,
  ConceptTypeDto,
  ContractTypeDto,
  JobPositionDto,
  NoveltyDto,
  PaymentDto,
  PaysheetDto,
  PaysheetTypeDto,
} from './dto';
import { json } from 'stream/consumers';

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

  /**
   * Esta funcion obtiene todas las novedades de la base de datos postgress.
   * @returns todas las novedades de la base de datos postgress.
   */
  async getAllNovelties(): Promise<NoveltyType[]> {
    try {
      return await this.plpgsqlService.executeQuery<NoveltyType>(
        PaysheetSql.getAllNovelties,
        [],
      );
    } catch (error) {
      this.logger.error('Error fetching all novelty types', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todos los tipos de concepto de la base de datos postgress.
   * @returns todos los tipos de concepto de la base de datos postgress.
   */
  async getAllConceptsTypes(): Promise<ConceptTypeType[]> {
    try {
      return await this.plpgsqlService.executeQuery<ConceptTypeType>(
        PaysheetSql.getAllConceptsTypes,
        [],
      );
    } catch (error) {
      this.logger.error('Error fetching all concept types', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todos los conceptos de la base de datos postgress.
   * @returns todas los conceptos de la base de datos postgress.
   */
  async getAllConcepts(): Promise<ConceptType[]> {
    try {
      return await this.plpgsqlService.executeQuery<ConceptType>(
        PaysheetSql.getAllConcepts,
        [],
      );
    } catch (error) {
      this.logger.error('Error fetching all concepts', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todos los pagos de la base de datos postgress.
   * @returns todos los pagos de la base de datos postgress.
   */
  async getAllPayments(): Promise<PaymentType[]> {
    try {
      return await this.plpgsqlService.executeQuery<PaymentType>(
        PaysheetSql.getAllPayments,
        [],
      );
    } catch (error) {
      this.logger.error('Error fetching all payments', error);
      throw error;
    }
  }

  /**
   * Esta funcion guarda una novedad en la base de datos postgress.
   * @param novelty la novedad a guardar en la base de datos.
   * @returns el id de la novedad guardada en la base de datos.
   */
  async saveNovelty(novelty: NoveltyDto): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<NoveltyDto>(
          PaysheetSql.saveNovelty,
          novelty,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error saving novelty', error);
      throw error;
    }
  }

  /**
   * Esta funcion guarda un tipo de concepto en la base de datos postgress.
   * @param conceptType el tipo de concepto a guardar en la base de datos.
   * @returns el id del tipo de concepto guardado en la base de datos.
   */
  async saveConceptType(conceptType: ConceptTypeDto): Promise<number> {
    try {
      if (conceptType.minValue && conceptType.maxValue) {
        conceptType.minMaxValue = `[${conceptType.minValue},${conceptType.maxValue})`;
      }
      if (conceptType.minValue && !conceptType.maxValue) {
        conceptType.minMaxValue = `[${conceptType.minValue},infinity)`;
      }
      if (!conceptType.minValue && conceptType.maxValue) {
        conceptType.minMaxValue = `[0,${conceptType.maxValue})`;
      }
      if (!conceptType.minValue && !conceptType.maxValue) {
        conceptType.minMaxValue = '[0,infinity)';
      }
      delete conceptType.minValue;
      delete conceptType.maxValue;
      return (
        await this.plpgsqlService.executeProcedureSave<ConceptTypeDto>(
          PaysheetSql.saveConceptType,
          conceptType,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error saving concept type', error);
      throw error;
    }
  }

  /**
   * Esta funcion guarda un concepto en la base de datos postgress.
   * @param concept el concepto a guardar en la base de datos.
   * @returns el id del concepto guardado en la base de datos.
   */
  async saveConcept(concept: ConceptDto): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<ConceptDto>(
          PaysheetSql.saveConcept,
          concept,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error saving concept', error);
      throw error;
    }
  }

  /**
   * Esta funcion guarda un pago en la base de datos postgress.
   * @param payment el pago a guardar en la base de datos.
   * @returns el id del pago guardado en la base de datos.
   */
  async savePayment(payment: PaymentDto): Promise<number> {
    try {
      if (
        !Boolean(
          (!payment.conceptId && !payment.contractId && payment.noveltyId) ||
            (!payment.conceptId && payment.contractId && !payment.noveltyId) ||
            (payment.conceptId && !payment.contractId && !payment.noveltyId),
        )
      )
        throw new BadRequestException(
          'the set of noveltyId, contractId and conceptId is invalid, only one of them can is defined',
        );
      payment.paymentTimestamp = new Date();
      return (
        await this.plpgsqlService.executeProcedureSave<PaymentDto>(
          PaysheetSql.savePayment,
          payment,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error saving payment', error);
      throw error;
    }
  }

  /**
   * Esta funcion actualiza una novedad en la base de datos postgress.
   * @param novelty la novedad a actualizar.
   * @param id id de la novedad a actualizar.
   */
  async updateNovelty(novelty: NoveltyDto, id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<NoveltyDto>(
        PaysheetSql.updateNovelty,
        novelty,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error updating novelty', error);
      throw error;
    }
  }

  /**
   * Esta funcion actualiza un tipo de concepto en la base de datos postgress.
   * @param conceptType el tipo de concepto a actualizar.
   * @param id id del tipo de concepto a actualizar.
   */
  async updateConceptType(
    conceptType: ConceptTypeDto,
    id: string,
  ): Promise<void> {
    try {
      if (conceptType.minValue && conceptType.maxValue) {
        conceptType.minMaxValue = `[${conceptType.minValue},${conceptType.maxValue})`;
      }
      if (conceptType.minValue && !conceptType.maxValue) {
        conceptType.minMaxValue = `[${conceptType.minValue},infinity)`;
      }
      if (!conceptType.minValue && conceptType.maxValue) {
        conceptType.minMaxValue = `[0,${conceptType.maxValue})`;
      }
      if (!conceptType.minValue && !conceptType.maxValue) {
        conceptType.minMaxValue = '[0,infinity)';
      }
      delete conceptType.minValue;
      delete conceptType.maxValue;
      await this.plpgsqlService.executeProcedureUpdate<ConceptTypeDto>(
        PaysheetSql.updateConceptType,
        conceptType,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error updating concept type', error);
      throw error;
    }
  }

  /**
   * Esta funcion actualiza un concepto en la base de datos postgress.
   * @param concept concepto a actualizar
   * @param id id del concepto a actualizar
   */
  async updateConcept(concept: ConceptDto, id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<ConceptDto>(
        PaysheetSql.updateConcept,
        concept,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error updating concept', error);
      throw error;
    }
  }

  /**
   * Esta funcion actualiza un pago en la base de datos postgress.
   * @param payment pago a actualizar
   * @param id id del pago a actualizar
   */
  async updatePayment(payment: PaymentDto, id: string): Promise<void> {
    try {
      if (
        !Boolean(
          (!payment.conceptId && !payment.contractId && payment.noveltyId) ||
            (!payment.conceptId && payment.contractId && !payment.noveltyId) ||
            (payment.conceptId && !payment.contractId && !payment.noveltyId),
        )
      )
        throw new BadRequestException(
          'the set of noveltyId, contractId and conceptId is invalid, only one of them can is defined',
        );
      payment.paymentTimestamp = new Date();
      await this.plpgsqlService.executeProcedureUpdate<PaymentDto>(
        PaysheetSql.updatePayment,
        payment,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error updating payment', error);
      throw error;
    }
  }

  /**
   * Esta funcion elimina una novedad de la base de datos postgress.
   * @param id id de la novedad a eliminar
   */
  async deleteNovelty(id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        PaysheetSql.deleteNovelty,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error deleting novelty', error);
      throw error;
    }
  }

  /**
   * Esta funcion elimina un tipo de concepto de la base de datos postgress.
   * @param id id del tipo de concepto a eliminar
   */
  async deleteConceptType(id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        PaysheetSql.deleteConceptType,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error deleting concept type', error);
      throw error;
    }
  }

  /**
   * Esta funcion elimina un concepto de la base de datos postgress.
   * @param id id del concepto a eliminar
   */
  async deleteConcept(id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        PaysheetSql.deleteConcept,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error deleting concept', error);
      throw error;
    }
  }

  /**
   * Esta funcion elimina un pago de la base de datos postgress.
   * @param id id del pago a eliminar
   */
  async deletePayment(id: string): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureDelete(
        PaysheetSql.deletePayment,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error deleting payment', error);
      throw error;
    }
  }
}
