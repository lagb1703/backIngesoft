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

  getUsersByCourseId = `
    SELECT 
      utpe."personalArchivo_id" as "id",
      utpe."personal_id" as "userId",
      utpe."educacion_id" as "courseId",
      utp."nombres" as "name",
      utp."apellidos" as "lastname",
      utp."identificacion" as "identification"
    FROM usuarios."TB_PersonalesEducacion" utpe
    LEFT JOIN usuarios."TB_Personales" utp
      ON utp."personal_id" = utpe."personal_id"
    WHERE utpe."educacion_id" = $1
    ORDER BY utp."nombres", utp."apellidos" ASC
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
  saveAssitence = `call usuarios."SP_CURSOSPKG_AGREGARASISTENCIA"($1, $2)`,
  linkCourse = `call usuarios."SP_CURSOSPKG_VINCULARCURSO"($1, $2)`,
  unlinkCourse = `call usuarios."SP_CURSOSPKG_DESVINCULARCURSO"($1)`,
}
