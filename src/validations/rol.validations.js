// Validaciones para POST y PUT
export const validateRol = (req, res, next) => {
    const { Nombre_rol, Estado } = req.body;
   
    if (!Nombre_rol || typeof Nombre_rol !== 'string' || !/^[a-zA-Z\s]+$/.test(Nombre_rol.trim())) {
        return res.status(400).json({ message: "Solicitud incorrecta. Nombre de rol inválido. Solo se permiten letras." });
    }if(!['A', 'I'].includes(Estado)) {
        return res.status(400).json({ message: "El estado debe ser 'A' (activo) o 'I' (inactivo)." });
    }

    next();
};

// Validaciones para PUT y DELETE (por ID)
export const validateRolId = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID de rol es requerido." });
    }

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "ID de rol inválido. Debe ser un número." });
    }

    next();
};
