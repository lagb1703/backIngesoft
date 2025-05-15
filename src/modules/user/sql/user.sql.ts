export enum UserSql {
  /**
   * @Querys Seccion solo para las consultas de tipo
   * SELECT
   */

  getAllUsers = `
        SELECT 
            personal_id as "userId",
            nombres as name,
            apellidos as "lastName",
            fechaingreso as "dates",
            correo as "email",
            celular as phone,
            identificacion as "identification",
            virtual as "isVirtual",
            cuenta as acount,
            direccion as address,
            rol_id as "roleId",
            tipoidentificacion_id as "identificationId",
            surcusal_id as "branchOficeId",
            estadopersona_id as "personStateId",
            mediopago_id as "meansOfPayment",
            contrasena as password
        FROM usuarios."TB_Personales"
        ORDER BY personal_id ASC 
    `,

  getUserById = `
        SELECT 
            personal_id as "userId",
            nombres as name,
            apellidos as "lastName",
            fechaingreso as "dates",
            correo as "email",
            celular as phone,
            identificacion as "identification",
            virtual as "isVirtual",
            cuenta as acount,
            direccion as address,
            rol_id as "roleId",
            tipoidentificacion_id as "identificationId",
            surcusal_id as "branchOficeId",
            estadopersona_id as "personStateId",
            mediopago_id as "meansOfPayment"
        FROM usuarios."TB_Personales"
        WHERE personal_id = $1
        ORDER BY personal_id ASC 
    `,

  getUserByIdentification = `
        SELECT 
            personal_id as "userId",
            nombres as name,
            apellidos as "lastName",
            fechaingreso as "dates",
            correo as "email",
            celular as phone,
            identificacion as "identification",
            virtual as "isVirtual",
            cuenta as acount,
            direccion as address,
            rol_id as "roleId",
            tipoidentificacion_id as "identificationId",
            surcusal_id as "branchOficeId",
            estadopersona_id as "personStateId",
            mediopago_id as "meansOfPayment"
        FROM usuarios."TB_Personales"
        WHERE identificacion = $1
        ORDER BY personal_id ASC 
        `,

  getUserByFilters = `
        SELECT 
            personal_id as "userId",
            nombres as name,
            apellidos as "lastName",
            fechaingreso as "dates",
            correo as "email",
            celular as phone,
            identificacion as "identification",
            virtual as "isVirtual",
            cuenta as acount,
            direccion as address,
            rol_id as "roleId",
            tipoidentificacion_id as "identificationId",
            surcusal_id as "branchOficeId",
            estadopersona_id as "personStateId",
            mediopago_id as "meansOfPayment"
        FROM usuarios."TB_Personales"
        :Conditions
        ORDER BY personal_id ASC 
        `,

  getUserAcountByEmail = `
        SELECT 
            personal_id as "userId",
            correo as "email",
            contrasena as password
        FROM usuarios."TB_Personales"
        WHERE correo = $1
    `,

  getRolByUserId = `
        SELECT 
            tp."rol_id" as "roleId",
            tr."nombre" as "roleName"
        FROM usuarios."TB_Personales" tp
        LEFT JOIN usuarios."TB_Roles" tr
            ON tp."rol_id" = tr."rol_id"
        WHERE tp.personal_id = $1
    `,

  getAllStates = `
        SELECT 
            tep.estadopersona_id as "stateId",
            tep.estado as "state"
        FROM usuarios."TB_EstadoPersona" tep
        ORDER BY tep.estado ASC 
    `,

  getAllRoles = `
        SELECT 
            tr."rol_id" as "roleId",
            tr."nombre" as "role"
        FROM usuarios."TB_Roles" tr
        ORDER BY tr."nombre" ASC
    `,

  getAllIdentificationTypes = `
        SELECT 
            tti."tipoidentificacion_id" as "identificationTypeId",
            tti."identificacion" as "identification"
        FROM usuarios."TB_TipoIdentidicacion" tti
        ORDER BY tti."identificacion" ASC 
    `,

  getAllUserFilesTypes = `
        SELECT 
            tta."tipoArchivo_id" as "fileTypeId",
            tta."tipoArchivo" as "fileType",
            tta."obligatorio" as "isMandatory"
        FROM archivos."TB_TiposArchivos" tta
        ORDER BY "tipoArchivo_id" ASC 
    `,

  getAllUserFiles = `
        SELECT 
            tpa."personalArchivo_id" as "fileUserId",
            tpa."personal_id" as "userId",
            tpa."archivo_id" as "fileId",
            tpa."tipoArchivo_id" as "fileTypeId",
            tta."tipoArchivo" as "fileType"
        FROM archivos."TB_PersonalesArchivos" tpa
        LEFT JOIN archivos."TB_TiposArchivos" tta
            ON tpa."tipoArchivo_id" = tta."tipoArchivo_id"
        ORDER BY "personalArchivo_id" ASC
    `,

  getAllUserFilesByUserId = `
        SELECT 
            tpa."personalArchivo_id" as "fileUserId",
            tpa."personal_id" as "userId",
            tpa."archivo_id" as "fileId",
            tpa."tipoArchivo_id" as "fileTypeId",
            tta."tipoArchivo" as "fileType"
        FROM archivos."TB_PersonalesArchivos" tpa
        LEFT JOIN archivos."TB_TiposArchivos" tta
            ON tpa."tipoArchivo_id" = tta."tipoArchivo_id"
        WHERE tpa."personal_id" = $1
        ORDER BY tpa."archivo_id" ASC
    `,

  getUserFilesByUserIdAndFileId = `
        SELECT 
            tpa."personalArchivo_id" as "fileUserId",
            tpa."personal_id" as "userId",
            tpa."archivo_id" as "fileId",
            tpa."tipoArchivo_id" as "fileTypeId",
            tta."tipoArchivo" as "fileType"
        FROM archivos."TB_PersonalesArchivos" tpa
        LEFT JOIN archivos."TB_TiposArchivos" tta
            ON tpa."tipoArchivo_id" = tta."tipoArchivo_id"
        WHERE tpa."personal_id" = $1 AND tpa."archivo_id" = $2
        ORDER BY tpa."archivo_id" ASC
    `,

  getAllFaults = `
        SELECT 
            utf."falta_id" "foultId",
            lower(utf."fecha") as "startDate",
            upper(utf."fecha") as "endDate",
            utf."justificación" as "justification",
            utf."personal_id" as "userId"
        FROM usuarios."TB_Faltas" utf
        ORDER BY upper(utf."fecha") DESC
    `,

  getFaultById = `
        SELECT 
            utf."falta_id" "foultId",
            lower(utf."fecha") as "startDate",
            upper(utf."fecha") as "endDate",
            utf."justificación" as "justification",
            utf."personal_id" as "userId"
        FROM usuarios."TB_Faltas" utf
        WHERE utf."falta_id" = $1
        ORDER BY upper(utf."fecha") DESC
    `,
  getFaultsByUserId = `
        SELECT 
            utf."falta_id" "foultId",
            lower(utf."fecha") as "startDate",
            upper(utf."fecha") as "endDate",
            utf."justificación" as "justification",
            utf."personal_id" as "userId"
        FROM usuarios."TB_Faltas" utf
        WHERE utf."personal_id" = $1
        ORDER BY upper(utf."fecha") DESC
    `,

  /**
   * @Actions Seccion solo para las consultas de tipo
   * INSERT, UPDATE, DELETE, POCEDURES
   */

  saveUser = `call usuarios."SP_USUARIOSPKG_AGREGARUSUARIO"($1, $2)`,
  saveFault = `call usuarios."SP_USUARIOSPKG_AGREGARFALTA"($1, $2)`,
  updateUser = `call usuarios."SP_USUARIOSPKG_EDITARUSUARIO"($1, $2)`,
  updateFault = `call usuarios."SP_USUARIOSPKG_EDITARFALTA"($1, $2)`,
  deleteUser = `call usuarios."SP_USUARIOSPKG_ELIMINARUSUARIO"($1)`,
  deleteFault = `call usuarios."SP_USUARIOSPKG_ELIMINARFALTA"($1)`,
  saveFileUserType = `call usuarios."SP_USUARIOSPKG_AGREGARTIPOARCHIVO"($1, $2)`,
  updateFileUserType = `call usuarios."SP_USUARIOSPKG_EDITARTIPOARCHIVO"($1, $2)`,
  deleteFileUserType = `call usuarios."SP_USUARIOSPKG_ELIMINARTIPOARCHIVO"($1)`,
  saveUserFile = `call usuarios."SP_USUARIOSPKG_AGREGARARCHIVO"($1, $2)`,
  deleteUserFile = `call usuarios."SP_USUARIOSPKG_ELIMINARCHIVO"($1)`,
}
