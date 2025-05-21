export enum EduationSql {
  /**
   * @Querys Seccion solo para las consultas de tipo
   * SELECT
   */
  getHabilities = `
    SELECT 
        uth."habilidad_id" as "habilityId",
        uth."nombre" as "name",
        uth."peso" as "weight"
    FROM usuarios."TB_Habilidades" uth
  `,

  getAllUserHabilities = `
    SELECT 
        uthp."habilidadPersona_id" as "userHabilityId",
        uthp."habilidad_id" as "habilityId",
        uthp."personal_id" as "userId",
        uthp."afinidad" as "afinity",
        uth."nombre"
    FROM usuarios."TB_HabilidadesPersonales" uthp
    LEFT JOIN usuarios."TB_Habilidades" uth
        ON uthp."habilidad_id" = uth."habilidad_id"
  `,

  getUserHabilitiesByUserId = `
    SELECT 
        uthp."habilidadPersona_id" as "userHabilityId",
        uthp."habilidad_id" as "habilityId",
        uthp."personal_id" as "userId",
        uthp."afinidad" as "afinity",
        uth."nombre"
    FROM usuarios."TB_HabilidadesPersonales" uthp
    LEFT JOIN usuarios."TB_Habilidades" uth
        ON uthp."habilidad_id" = uth."habilidad_id"
    WHERE uthp."personal_id" = $1
  `,

  /**
   * @Actions Seccion solo para las consultas de tipo
   * INSERT, UPDATE, DELETE, POCEDURES
   */

  saveHability = `call usuarios."SP_HABILIDADESPKG_AGREGARHABILIDAD"($1, $2)`,
  updateHability = `call usuarios."SP_HABILIDADESPKG_EDITARHABILIDAD"($1, $2)`,
  deleteHability = `call usuarios."SP_HABILIDADESPKG_ELIMINARHABILIDAD"($1)`,
  saveHabilityUser = `call usuarios."SP_HABILIDADESPKG_VINCULARHABILIDADPERSONA"($1, $2)`,
  updatAfinityeHabilityUser = `call usuarios."SP_HABILIDADESPKG_EDITARHABILIDADPERSONA"($1, $2)`,
}
