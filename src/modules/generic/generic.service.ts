import { Injectable, Logger } from '@nestjs/common';
import { BranchOfOfficeDto, MeansOfPaymentDto } from './dto';
import { GenericSql } from './sql/generic.sql';
import { PlpgsqlService } from 'src/newCore/database/services';

@Injectable()
export class GenericService {
  private readonly logger = new Logger(GenericService.name);
  constructor(private readonly plpgsqlService: PlpgsqlService) {}

  /**
   * Esta funcion persite en la base de datos postgress una sucursal
   * @param branchOfOfficeDto surcusal a guardar
   * @description Guarda una sucursal en la base de datos
   * @returns El id de la sucursal guardada
   * @throws Error si ocurre un error al guardar la sucursal
   */
  async saveBranchOfOffice(
    branchOfOfficeDto: BranchOfOfficeDto,
  ): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<BranchOfOfficeDto>(
          GenericSql.saveBranchOfOffice,
          branchOfOfficeDto,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error saving branch of office', error);
      throw error;
    }
  }

  /**
   * Esta funcion persite en la base de datos postgress un metodo de pago
   * @param meansOfPaymentDto metodo de pago a guardar
   * @description Guarda un metodo de pago en la base de datos
   * @returns el id del metodo de pago guardado
   * @throws Error si ocurre un error al guardar el metodo de pago
   */
  async saveMeansOfPayment(
    meansOfPaymentDto: MeansOfPaymentDto,
  ): Promise<number> {
    try {
      return (
        await this.plpgsqlService.executeProcedureSave<MeansOfPaymentDto>(
          GenericSql.saveMeansOfPayment,
          meansOfPaymentDto,
        )
      )['p_id'];
    } catch (error) {
      this.logger.error('Error saving means of payment', error);
      throw error;
    }
  }
}
