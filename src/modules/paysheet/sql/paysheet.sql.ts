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
      ntn."valor" as "value",
      ntn."contratoNomina_id" as "contractId",
      utp."nombres" || utp."apellidos" as "name"
    FROM nominas."TB_Novedades" ntn
    LEFT JOIN nominas."TB_ContratoNomina" ntcn
    ON ntcn."contratoNomina_id" = ntn."contratoNomina_id"
    LEFT JOIN usuarios."TB_Personales" utp
    ON utp."personal_id" = ntcn."personal_id"
    ORDER BY ntn."nombre" ASC 
  `,

  getNoveltyById = `
    SELECT 
      ntn."novedad_id" as "noveltyId",
      ntn."nombre" as "name",
      lower(ntn."rango") as "dateLower",
      upper(ntn."rango") as "dateUpper",
      ntn."valor" as "value",
      ntn."contratoNomina_id" as "contractId",
      utp."nombres" || utp."apellidos" as "name"
    FROM nominas."TB_Novedades" ntn
    LEFT JOIN nominas."TB_ContratoNomina" ntcn
    ON ntcn."contratoNomina_id" = ntn."contratoNomina_id"
    LEFT JOIN usuarios."TB_Personales" utp
    ON utp."personal_id" = ntcn."personal_id"
    WHERE ntn."novedad_id" = $1
  `,

  getNoveltiesByDate = `
    SELECT 
      ntn."novedad_id" as "noveltyId",
      ntn."nombre" as "name",
      lower(ntn."rango") as "dateLower",
      upper(ntn."rango") as "dateUpper",
      ntn."valor" as "value",
      ntn."contratoNomina_id" as "contractId",
      utp."nombres" || utp."apellidos" as "name"
    FROM nominas."TB_Novedades" ntn
    LEFT JOIN nominas."TB_ContratoNomina" ntcn
    ON ntcn."contratoNomina_id" = ntn."contratoNomina_id"
    LEFT JOIN usuarios."TB_Personales" utp
    ON utp."personal_id" = ntcn."personal_id"
    WHERE CAST($1 AS DATE) <@ ntn."rango"
  `,

  getNoveltiesByContractId = `
    SELECT 
      ntn."novedad_id" as "noveltyId",
      ntn."nombre" as "name",
      lower(ntn."rango") as "dateLower",
      upper(ntn."rango") as "dateUpper",
      ntn."valor" as "value",
      ntn."contratoNomina_id" as "contractId",
      utp."nombres" || ' ' || utp."apellidos" as "name"
    FROM nominas."TB_Novedades" ntn
    LEFT JOIN nominas."TB_ContratoNomina" ntcn
    ON ntcn."contratoNomina_id" = ntn."contratoNomina_id"
    LEFT JOIN usuarios."TB_Personales" utp
    ON utp."personal_id" = ntcn."personal_id"
    WHERE ntn."contratoNomina_id" = $1
  `,

  getNoveltiesByDateAndContractId = `
    SELECT 
      ntn."novedad_id" as "noveltyId",
      ntn."nombre" as "name",
      lower(ntn."rango") as "dateLower",
      upper(ntn."rango") as "dateUpper",
      ntn."valor" as "value",
      ntn."contratoNomina_id" as "contractId",
      utp."nombres" || ' ' || utp."apellidos" as "name"
    FROM nominas."TB_Novedades" ntn
    LEFT JOIN nominas."TB_ContratoNomina" ntcn
    ON ntcn."contratoNomina_id" = ntn."contratoNomina_id"
    LEFT JOIN usuarios."TB_Personales" utp
    ON utp."personal_id" = ntcn."personal_id"
    WHERE CAST($1 AS DATE) <@ ntn."rango" AND
      ntn."contratoNomina_id" = $2
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

  getConceptTypeById = `
    SELECT 
      nttc."tipoConcepto_id" as "conceptTypeId",
      nttc."tipoConcepto" as "conceptType",
      lower(nttc."minMaxRange") as "minValue",
      upper(nttc."minMaxRange") as "maxValue",
      cast(nttc."porcentaje" as integer) as "percentage"
    FROM nominas."TB_TipoConcepto" nttc
    WHERE nttc."tipoConcepto_id" = $1
  `,

  getAllConcepts = `
    SELECT 
      ntc."concepto_id" as "conceptId",
      ntc."tipoConcepto_id" as "conceptTypeId",
      ntc."ciudad_id" as "cityId",
      ntc."empresa_id" as "companyId"
    FROM nominas."TB_Concepto" ntc
  `,

  getConceptById = `
    SELECT 
      ntc."concepto_id" as "conceptId",
      ntc."tipoConcepto_id" as "conceptTypeId",
      ntc."ciudad_id" as "cityId",
      ntc."empresa_id" as "companyId"
    FROM nominas."TB_Concepto" ntc
    WHERE ntc."concepto_id" = $1
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

  getPaymentById = `
    SELECT 
      ntp."pago_id" as "payment_id",
      ntp."archivo_id" as "fileId",
      ntp."fechaPago" as "paymentTimestamp",
      ntp."novedad_id" as "noveltyId",
      ntp."contratoNomina_id" as "contractId",
      ntp."concepto_id" as "conceptId",
      ntp."personal_id" as "userId"
    FROM nominas."TB_Pagos" ntp
    WHERE ntp."pago_id" = $1
  `,

  getPaymentsByDates = `
    SELECT 
      ntp."pago_id" as "payment_id",
      ntp."archivo_id" as "fileId",
      ntp."fechaPago" as "paymentTimestamp",
      ntp."novedad_id" as "noveltyId",
      ntp."contratoNomina_id" as "contractId",
      ntp."concepto_id" as "conceptId",
      ntp."personal_id" as "userId"
    FROM nominas."TB_Pagos" ntp
    WHERE CAST(ntp."fechaPago" AS DATE) <@ daterange(CAST($1 AS DATE), CAST($2 AS DATE), '[]')
  `,

  getPaymentsByUserId = `
    SELECT 
      ntp."pago_id" as "payment_id",
      ntp."archivo_id" as "fileId",
      ntp."fechaPago" as "paymentTimestamp",
      ntp."novedad_id" as "noveltyId",
      ntp."contratoNomina_id" as "contractId",
      ntp."concepto_id" as "conceptId",
      ntp."personal_id" as "userId"
    FROM nominas."TB_Pagos" ntp
    WHERE ntp."personal_id" = $1
  `,

  getAllUnPayments = `
    SELECT * FROM nominas."pagosActualesUsuarios"
  `,

  getAllUnPaymentsByUserId = `
    WITH 
      "novedadesActuales" AS (
      SELECT 
        ntn."novedad_id" as "noveltyId",
        ntn."porcentaje" as "percentage",
        ntn."valor" as "value",
        ntn."contratoNomina_id"
      FROM nominas."TB_Novedades" ntn
      WHERE CURRENT_DATE <@ ntn."rango"
      ),
      "pagosActuales" AS (
      SELECT 
        ntp."contratoNomina_id"
      FROM nominas."TB_Pagos" ntp
      WHERE EXTRACT(MONTH FROM ntp."fechaPago") = EXTRACT(MONTH FROM CURRENT_DATE)
      )
    SELECT 
      utp."personal_id" as "userId",
      utp."nombres" || ' ' || utp."apellidos" as "name",
      utp."cuenta" as "account",
      utp."identificacion" as "identificacion",
      utp."mediopago_id" as "meansOfPaymentId",
      ntcn."salario" as "salary",
      nttn."diaPago" AS "payDay",
      json_agg(json_build_object('noveltyId', na."noveltyId", 'percentage', na."percentage", 'value', na."value"))
      FILTER (WHERE ntcn."contratoNomina_id" = na."contratoNomina_id") as "novedades"
    FROM usuarios."TB_Personales" utp
    INNER JOIN nominas."TB_ContratoNomina" ntcn
      ON utp."personal_id" = ntcn."personal_id"
    LEFT JOIN nominas."TB_TipoNomina" nttn
      ON nttn."tipoNomina_id" = ntcn."tipoNomina_id"
    LEFT JOIN "novedadesActuales" na
      ON ntcn."contratoNomina_id" = na."contratoNomina_id"
    LEFT JOIN "pagosActuales" pa
      ON ntcn."contratoNomina_id" = pa."contratoNomina_id"
    WHERE 
      CURRENT_DATE <@ utp."fechaingreso" AND
      CURRENT_DATE <@ ntcn."fecha" AND
      pa."contratoNomina_id" IS NULL AND
      EXTRACT(DAY FROM CURRENT_DATE) BETWEEN 1 AND nttn."diaPago" AND
      utp."personal_id" = $1
    GROUP BY utp."personal_id", ntcn."contratoNomina_id", nttn."diaPago"
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
