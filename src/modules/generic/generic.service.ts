import { Injectable, Logger } from '@nestjs/common';
import { BranchOfOfficeDto, MeansOfPaymentDto } from './dto';
import { GenericSql } from './sql/generic.sql';
import { PlpgsqlService } from 'src/newCore/database/services';
import { Citytype, MeansOfPaymentType } from './types';
import { BranchOfOfficeType } from './types/branchOfOffice.type';
import { MongoService } from 'src/mongoCore/database/services';
import { GenericColletion } from './mongo/generic.mongo';
import { ObjectId } from 'mongodb';
import { CityDto } from './dto/city.dto';
import { CompanyType } from './types/companies.type';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class GenericService {
  private readonly logger = new Logger(GenericService.name);
  constructor(
    private readonly plpgsqlService: PlpgsqlService,
    private readonly mongoService: MongoService,
  ) {}

  /**
   * Esta funcion obtiene todos los medios de pago de la base de datos postgress
   * @description Obtiene todos los medios de pago de la base de datos
   * @returns Un array con todos los medios de pago
   * @throws Error si ocurre un error al obtener los medios de pago
   */
  async getAllMeansOfPayment(): Promise<MeansOfPaymentType[]> {
    try {
      return await this.plpgsqlService.executeQuery<MeansOfPaymentType>(
        GenericSql.getAllMeansOfPayment,
        [],
      );
    } catch (error) {
      this.logger.error('Error getting all means of payment', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene un medio de pago de la base de datos postgress.
   * @param id id del medio de pago a buscar
   * @description Esta funcion obtiene un medio de pago de la base de datos postgress
   * @returns El medio de pago encontrado
   * @throws Error si ocurre un error al obtener el medio de pago
   */
  async getMeansOfPaymentById(id: number): Promise<MeansOfPaymentType> {
    try {
      return (
        await this.plpgsqlService.executeQuery<MeansOfPaymentType>(
          GenericSql.getMeansOfPaymentById,
          [id],
        )
      )[0];
    } catch (error) {
      this.logger.error('Error getting means of payment by id', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene un medio de pago de la base de datos postgress.
   * @param name nombre del medio de pago a buscar
   * @returns todos los medios de pago que coincidan con el nombre
   * @description Esta funcion obtiene un medio de pago de la base de datos postgress
   * @throws Error si ocurre un error al obtener el medio de pago
   */
  async getMeansOfPaymentByName(name: string): Promise<MeansOfPaymentType[]> {
    try {
      return await this.plpgsqlService.executeQuery<MeansOfPaymentType>(
        GenericSql.getMeansOfPaymentByName,
        [name],
      );
    } catch (error) {
      this.logger.error('Error getting means of payment by name', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todas las sucursales de la base de datos postgress
   * @returns todas las sucursales de la base de datos postgress
   * @description Esta funcion obtiene todas las sucursales de la base de datos postgress
   * @throws Error si ocurre un error al obtener las sucursales
   */
  async getAllBranchOfOffice(): Promise<BranchOfOfficeType[]> {
    try {
      return await this.plpgsqlService.executeQuery<BranchOfOfficeType>(
        GenericSql.getAllBranchOfOffice,
        [],
      );
    } catch (error) {
      this.logger.error('Error getting all branch of office', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene una sucursal de la base de datos postgress
   * @param id id de la sucursal a buscar
   * @description Esta funcion obtiene una sucursal de la base de datos postgress
   * @returns la sucursal encontrada
   */
  async getBranchOfOfficeById(id: number): Promise<BranchOfOfficeType> {
    try {
      return (
        await this.plpgsqlService.executeQuery<BranchOfOfficeType>(
          GenericSql.getBranchOfOfficeById,
          [id],
        )
      )[0];
    } catch (error) {
      this.logger.error('Error getting branch of office by id', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene una sucursal de la base de datos postgress
   * @param name nombre de la sucursal a buscar
   * @description Esta funcion obtiene una sucursal de la base de datos postgress
   * @returns todas las sucursales que coincidan con el nombre
   * @throws Error si ocurre un error al obtener la sucursal
   */
  async getBranchOfOfficeByName(name: string): Promise<BranchOfOfficeType[]> {
    try {
      return await this.plpgsqlService.executeQuery<BranchOfOfficeType>(
        GenericSql.getBranchOfOfficeByName,
        [`%${name}%`],
      );
    } catch (error) {
      this.logger.error('Error getting branch of office by name', error);
      throw error;
    }
  }

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
   * Esta funcion actualiza una sucursal en la base de datos postgress.
   * @param branchOfOfficeDto Contenido de la sucursal a actualizar
   * @description Esta funcion actualiza una sucursal en la base de datos postgress
   * @param id id de la sucursal a actualizar
   * @throws Error si ocurre un error al actualizar la sucursal
   */
  async updateBranchOfOffice(
    branchOfOfficeDto: BranchOfOfficeDto,
    id: string,
  ): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<BranchOfOfficeDto>(
        GenericSql.updateBranchOfOffice,
        branchOfOfficeDto,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error updating branch of office', error);
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

  /**
   * Esta funcion actualiza un metodo de pago en la base de datos postgress.
   * @param meansOfPaymentDto Contenido del metodo de pago a actualizar
   * @description Esta funcion actualiza un metodo de pago en la base de datos postgress
   * @param id id del metodo de pago a actualizar
   * @throws Error si ocurre un error al actualizar el metodo de pago
   */
  async updateMeansOfPayment(
    meansOfPaymentDto: MeansOfPaymentDto,
    id: string,
  ): Promise<void> {
    try {
      await this.plpgsqlService.executeProcedureUpdate<MeansOfPaymentDto>(
        GenericSql.updateMeansOfPayment,
        meansOfPaymentDto,
        Number(id),
      );
    } catch (error) {
      this.logger.error('Error updating means of payment', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todas las ciudades de la base de datos mongo
   * @returns Un array con todas las ciudades
   * @description Esta funcion obtiene todas las ciudades de la base de datos
   */
  async getAllCities(): Promise<Citytype[]> {
    try {
      return (await this.mongoService.aggregate(GenericColletion.CO_Ciudades, [
        {
          $project: {
            _id: 0,
            city_id: '$_id',
            city: '$ciudad',
          },
        },
      ])) as Citytype[];
    } catch (error) {
      this.logger.error('Error getting all cities', error);
      throw error;
    }
  }

  /**
   * Esta funcion guarda una nueva ciudad en la base de datos mongo
   * @param city ciudad a guardar
   * @description Esta funcion guarda una ciudad en la base de datos mongo
   * @returns el id de la ciudad guardada
   */
  async saveCity(city: CityDto): Promise<string> {
    try {
      return (
        await this.mongoService.insert(GenericColletion.CO_Ciudades, {
          ciudad: city.city,
        })
      ).toString();
    } catch (error) {
      this.logger.error('Error saving city', error);
      throw error;
    }
  }

  /**
   * Esta funcion elimina una ciudad de la base de datos mongo
   * @param cityId id de la ciudad a eliminar
   */
  async deleteCity(cityId: string): Promise<void> {
    try {
      await this.mongoService.delete(GenericColletion.CO_Ciudades, {
        _id: new ObjectId(cityId),
      });
    } catch (error) {
      this.logger.error('Error deleting city', error);
      throw error;
    }
  }

  /**
   * Esta funcion obtiene todas las empresas de la base de datos mongo
   * @returns Un array con todas las empresas
   */
  async getAllCompanies(): Promise<CompanyType[]> {
    try {
      return (await this.mongoService.aggregate(GenericColletion.CO_Empresas, [
        {
          $project: {
            _id: 0,
            companyId: '$_id',
            company: '$empresa',
            email: '$correo',
          },
        },
      ])) as CompanyType[];
    } catch (error) {
      this.logger.error('Error getting all companies', error);
      throw error;
    }
  }

  async getCompanyById(companyId: string): Promise<CompanyType> {
    try {
      return (await this.mongoService.aggregate(GenericColletion.CO_Empresas, [
        {
          $match: {
            _id: new ObjectId(companyId), 
          },
        },
        {
          $project: {
            _id: 0,
            companyId: '$_id',
            company: '$empresa',
            email: '$correo',
          },
        },
      ]))[0] as CompanyType;
    } catch (error) {
      this.logger.error('Error getting all companies', error);
      throw error;
    }
  }

  /**
   * Esta funcion guarda una nueva empresa en la base de datos mongo
   * @param company empresa a guardar
   * @returns el id de la empresa guardada
   */
  async saveCompany(company: CompanyDto): Promise<string> {
    try {
      return (
        await this.mongoService.insert(GenericColletion.CO_Empresas, {
          empresa: company.company,
          correo: company.email,
        })
      ).toString();
    } catch (error) {
      this.logger.error('Error saving company', error);
      throw error;
    }
  }

  /**
   * Esta funcion elimina una empresa de la base de datos mongo
   * @param companyId id de la empresa a eliminar
   */
  async deleteCompany(companyId: string): Promise<void> {
    try {
      await this.mongoService.delete(GenericColletion.CO_Empresas, {
        _id: new ObjectId(companyId),
      });
    } catch (error) {
      this.logger.error('Error deleting company', error);
      throw error;
    }
  }
}
