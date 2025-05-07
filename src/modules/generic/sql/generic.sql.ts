export enum GenericSql {
    /**
     * @Querys Seccion solo para las consultas de tipo
     * SELECT
     */
  
    /**
     * @Actions Seccion solo para las consultas de tipo
     * INSERT, UPDATE, DELETE, POCEDURES
     */

    saveBranchOfOffice = `call public."SP_ESPACIOSPKG_AGREGARSURCUSAL"($1, $2)`,
    saveMeansOfPayment = `call public."SP_PAGOSPKG_AGREGARMETODOPAGO"($1, $2)`,
  }
  