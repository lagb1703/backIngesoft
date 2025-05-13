export enum PaysheetSql {
  /**
   * @Querys Seccion solo para las consultas de tipo
   * SELECT
   */
  getAllJobPosition = `
    SELECT 
      tc."cargo_id" as "jobPositionId",
      tc."cargo" as "jpbPosition"
    FROM nominas."TB_Cargo" tc
    ORDER BY tc."cargo" ASC
  `,

  getJobPositionById = `
    SELECT 
      tc."cargo_id" as "jobPositionId",
      tc."cargo" as "jpbPosition"
    FROM nominas."TB_Cargo" tc
    WHERE tc."cargo_id" = $1
  `,

  getAllPaysheet = `
    SELECT 
      tcn."contratoNomina_id" as "paysheetId",
      tcn."salario" as "salary",
      tcn."fecha" as "contractDayRange",
      tcn."archivo_id" as "fileId",
      tcn."tipoNomina_id" as "paysheetId",
      tcn."tipoContrato_id" as "contractTypeId",
      tcn."cargo_id" as "jobPositionId",
      tcn."requerimiento_id" as "requestId",
      tcn."personal_id" as "userId",
      tp."nombres" || tp."apellidos" as "name",
      tp."identificacion" as "identification"
    FROM nominas."TB_ContratoNomina" tcn
    LEFT JOIN usuarios."TB_Personales" tp
      ON tp."personal_id" = tcn."personal_id"
  `,

  getPaysheetByUserId = `
    SELECT 
      tcn."contratoNomina_id" as "paysheetId",
      tcn."salario" as "salary",
      tcn."fecha" as "contractDayRange",
      tcn."archivo_id" as "fileId",
      tcn."tipoNomina_id" as "paysheetId",
      tcn."tipoContrato_id" as "contractTypeId",
      tcn."cargo_id" as "jobPositionId",
      tcn."requerimiento_id" as "requestId",
      tcn."personal_id" as "userId"
    FROM nominas."TB_ContratoNomina" tcn
    WHERE tcn."personal_id" = $1
  `,

  getAllContractType = `
    SELECT 
      ttc."tipoContrato_id" as "contractTypeId",
      ttc."contrato" as "contractType",
      ttc."maximoDias" as "maxDay"
    FROM nominas."TB_TipoContrato" ttc
    ORDER BY ttc."contrato" ASC 
  `,

  getContractTypeById = `
    SELECT 
      ttc."tipoContrato_id" as "contractTypeId",
      ttc."contrato" as "contractType",
      ttc."maximoDias" as "maxDay"
    FROM nominas."TB_TipoContrato" ttc
    WHERE ttc."tipoContrato_id" = $1
  `,

  getAllPaysheetType = `
    SELECT 
      ttn."tipoNomina_id" as "paysheetTypeId",
      ttn."nomina" as "paysheet",
      ttn."diaPago" as "payDay"
    FROM nominas."TB_TipoNomina" ttn
    ORDER BY ttn."nomina" ASC 
  `,

  getPaysheetTypeById = `
    SELECT 
      ttn."tipoNomina_id" as "paysheetTypeId",
      ttn."nomina" as "paysheet",
      ttn."diaPago" as "payDay"
    FROM nominas."TB_TipoNomina" ttn
    WHERE ttn."tipoNomina_id" = $1
  `,

  getAllNovelties = `
    SELECT 
      ntn."novedad_id" as "noveltyId",
      ntn."nombre" as "name",
      lower(ntn."rango") as "dateLower",
      upper(ntn."rango") as "dateUpper",
      ntn."valor" as "value"
    FROM nominas."TB_Novedades" ntn
    ORDER BY ntn."nombre" ASC 
  `,

  getAllConceptsTypes = `
    SELECT 
      nttc."tipoConcepto_id" as "conceptTypeId",
      nttc."tipoConcepto" as "conceptType",
      lower(nttc."minMaxRange") as "minValue",
      upper(nttc."minMaxRange") as "maxValue",
      cast(nttc."porcentaje" as integer) as "percentage"
    FROM nominas."TB_TipoConcepto" nttc
    ORDER BY nttc."tipoConcepto" ASC
  `,

  getAllConcepts = `
    SELECT 
      ntc."concepto_id" as "conceptId",
      ntc."tipoConcepto_id" as "conceptTypeId",
      ntc."ciudad_id" as "cityId",
      ntc."empresa_id" as "companyId"
    FROM nominas."TB_Concepto" ntc;
  `,

  getAllPayments = `
    SELECT 
      ntp."pago_id" as "payment_id",
      ntp."archivo_id" as "fileId",
      ntp."fechaPago" as "paymentTimestamp",
      ntp."novedad_id" as "noveltyId",
      ntp."contratoNomina_id" as "contractId",
      ntp."concepto_id" as "conceptId",
      ntp."personal_id" as "userId"
    FROM nominas."TB_Pagos" ntp
    ORDER BY ntp."fechaPago" ASC 
  `,

  /**
   * @Actions Seccion solo para las consultas de tipo
   * INSERT, UPDATE, DELETE, POCEDURES
   */
  saveJobPosition = `call nominas."SP_NOMINASPKG_AGREGARCARGO"($1, $2)`,
  saveContractType = `call nominas."SP_NOMINASPKG_AGREGARTIPOCONTRATO"($1, $2)`,
  savePaysheetType = `call nominas."SP_NOMINASPKG_AGREGARTIPONOMINA"($1, $2)`,
  saveNovelty = `call nominas."SP_NOMINASPKG_AGREGARNOVEDADES"($1, $2)`,
  saveConceptType = `call nominas."SP_NOMINASPKG_AGREGARTIPOCONCEPTO"($1, $2)`,
  saveConcept = `call nominas."SP_NOMINASPKG_AGREGARCONCEPTO"($1, $2)`,
  savePayment = `call nominas."SP_NOMINASPKG_AGREGARPAGO"($1, $2)`,
  makePaysheet = `call nominas."SP_NOMINASPKG_CREARNOMINA"($1, $2)`,
  updateJobPosition = `call nominas."SP_NOMINASPKG_EDITARCARGO"($1, $2)`,
  updatePaysheet = `call nominas."SP_NOMINASPKG_EDITARNOMINA"($1, $2)`,
  updateContractType = `call nominas."SP_NOMINASPKG_EDITARTIPOCONTRATO"($1, $2)`,
  updatePaysheetType = `call nominas."SP_NOMINASPKG_EDITARTIPONOMINA"($1, $2)`,
  updateNovelty = `call nominas."SP_NOMINASPKG_EDITARNOVEDADES"($1, $2)`,
  updateConceptType = `call nominas."SP_NOMINASPKG_EDITARTIPOCONCEPTO"($1, $2)`,
  updateConcept = `call nominas."SP_NOMINASPKG_EDITARCONCEPTO"($1, $2)`,
  updatePayment = `call nominas."SP_NOMINASPKG_EDITARPAGO"($1, $2)`,
  deleteJobPosition = `call nominas."SP_NOMINASPKG_ELIMINARCARGO"($1)`,
  deletePaysheet = `call nominas."SP_NOMINASPKG_ELIMINARNOMINA"($1)`,
  deleteContractType = `call nominas."SP_NOMINASPKG_ELIMINARTIPOCONTRATO"($1)`,
  deletePaysheetType = `call nominas."SP_NOMINASPKG_ELIMINARTIPONOMINA"($1)`,
  deleteNovelty = `call nominas."SP_NOMINASPKG_ELIMINARNOVEDADES"($1)`,
  deleteConceptType = `call nominas."SP_NOMINASPKG_ELIMINARTIPOCONCEPTO"($1)`,
  deleteConcept = `call nominas."SP_NOMINASPKG_ELIMINARCONCEPTO"($1)`,
  deletePayment = `call nominas."SP_NOMINASPKG_ELIMINARPAGO"($1)`,
}
