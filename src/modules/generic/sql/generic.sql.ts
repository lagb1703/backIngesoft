export enum GenericSql {
  /**
   * @Querys Seccion solo para las consultas de tipo
   * SELECT
   */
  getAllMeansOfPayment = `
    SELECT 
      tmp."mediopago_id" as "meansOfPaymentId",
      tmp."mediopago" as "meansOfPayment"
    FROM public."TB_MediosPago" tmp
    ORDER BY tmp."mediopago" ASC 
  `,

  getMeansOfPaymentById = `
    SELECT 
      tmp."mediopago" as "meansOfPayment"
    FROM public."TB_MediosPago" tmp
    WHERE tmp."mediopago_id" = $1
    ORDER BY tmp."mediopago" ASC 
  `,

  getMeansOfPaymentByName = `
    SELECT 
      tmp."mediopago_id" as "meansOfPaymentId",
      tmp."mediopago" as "meansOfPayment"
    FROM public."TB_MediosPago" tmp
    WHERE lower(tmp."mediopago") like $1
    ORDER BY tmp."mediopago" ASC 
  `,

  getAllBranchOfOffice = `
    SELECT 
      ts."surcusal_id" as "branchOfOfficeId",
      ts."nombre" as "branchOfOffice",
      ts."direccion" as "address",
      ts."ciudad_id" as "cityId"
    FROM public."TB_Surcusal" ts
    ORDER BY ts."nombre" ASC
  `,

  getBranchOfOfficeById = `
    SELECT 
      ts."nombre" as "branchOfOffice",
      ts."direccion" as "address",
      ts."ciudad_id" as "cityId"
    FROM public."TB_Surcusal" ts
    WHERE ts."surcusal_id" = $1
  `,

  getBranchOfOfficeByName = `
    SELECT 
      ts."surcusal_id" as "branchOfOfficeId",
      ts."nombre" as "branchOfOffice",
      ts."direccion" as "address",
      ts."ciudad_id" as "cityId"
    FROM public."TB_Surcusal" ts
    WHERE lower(ts."nombre") LIKE $1
    ORDER BY ts."nombre" ASC 
  `,

  /**
   * @Actions Seccion solo para las consultas de tipo
   * INSERT, UPDATE, DELETE, POCEDURES
   */

  saveBranchOfOffice = `call public."SP_ESPACIOSPKG_AGREGARSURCUSAL"($1, $2)`,
  updateBranchOfOffice = `call public."SP_ESPACIOSPKG_EDITARSURCUSAL"($1, $2)`,
  saveMeansOfPayment = `call public."SP_PAGOSPKG_AGREGARMETODOPAGO"($1, $2)`,
  updateMeansOfPayment = `call public."SP_PAGOSPKG_EDITARMETODOPAGO"($1, $2)`,
}
