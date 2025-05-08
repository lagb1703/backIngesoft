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

  /**
   * @Actions Seccion solo para las consultas de tipo
   * INSERT, UPDATE, DELETE, POCEDURES
   */

  saveUser = `call usuarios."SP_USUARIOSPKG_AGREGARUSUARIO"($1, $2)`,
  updateUser = `call usuarios."SP_USUARIOSPKG_EDITARUSUARIO"($1, $2)`,
  deleteUser = `call usuarios."SP_USUARIOSPKG_ELIMINARUSUARIO"($1)`,
}
