// Validaciones para POST y PUT
export const validateUser = (req, res, next) => {
    const { Nombre_usuario, Correo, Contraseña, Telefono, Estado } = req.body;

    // Verifica que Nombre_usuario está presente, es una cadena, no está vacío, y contiene solo letras
    if (!Nombre_usuario || typeof Nombre_usuario !== 'string' || !/^[a-zA-Z\s]+$/.test(Nombre_usuario.trim())) {
        return res.status(400).json({ message: "Nombre de usuario inválido. Solo se permiten letras." });
    }

    // Verifica que Correo está presente, es una cadena, no está vacío y tiene formato de correo electrónico
    if (!Correo || typeof Correo !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Correo.trim())) {
        return res.status(400).json({ message: "Correo inválido. Debe ser una dirección de correo electrónico válida." });
    }

    // Verifica que Contraseña está presente, es una cadena y no está vacía
    if (!Contraseña || typeof Contraseña !== 'string' || Contraseña.trim().length === 0) {
        return res.status(400).json({ message: "Contraseña inválida. No puede estar vacía." });
    }

    // Verifica que Telefono está presente, es una cadena, no está vacío y contiene solo dígitos
    if (!Telefono || typeof Telefono !== 'string' || !/^\d+$/.test(Telefono.trim())) {
        return res.status(400).json({ message: "Teléfono inválido. Solo se permiten números." });
    }

    if (!['A', 'I'].includes(Estado)) {
        return res.status(400).json({ message: "El estado debe ser 'A' (activo) o 'I' (inactivo)." });
    }

    next();
};

// Validaciones para PUT y DELETE (por ID)
export const validateUserId = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID de usuario es requerido." });
    }

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "ID de usuario inválido. Debe ser un número." });
    }

    next();
};
