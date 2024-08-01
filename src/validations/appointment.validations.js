// Validaciones para POST y PUT
export const validateAppointment = (req, res, next) => {
    const { hora_inicio, hora_fin, fecha, total, estado } = req.body;
   
    if (!hora_inicio || !hora_fin || !fecha || !total || !estado) {
        return res.status(400).json({ message: "Solicitud incorrecta. Por favor, complete todos los campos." });
    }

    if (typeof hora_inicio == 'string' || hora_fin.trim().length === 0) {
        return res.status(400).json({ message: "Nombre de producto inválido." });
    }

    if (typeof total !== 'number' || total <= 0) {
        return res.status(400).json({ message: "Total inválido. Debe ser un número mayor que 0." });
    }

    if (!['A', 'I'].includes(Estado)) {
        return res.status(400).json({ message: "El estado debe ser 'A' (activo) o 'I' (inactivo)." });
    }

    if (hora_inicio !== matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/) || hora_fin !== matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)) {
        return res.status(400).json({ message: "Hora inválida. Debe ser una fecha valida." });
    }
    if (fecha !== isISO8601()){
        return res.status(400).json({ message: "Fecha inválida. Debe ser una fecha valida." });

    }

    next();
};

// Validaciones para PUT y DELETE (por ID)
export const validateAppointmentId = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID de cita es requerido." });
    }

    if (isNaN(Number(id))) {
        return res.status(400).json({ message: "ID de cita inválido. Debe ser un número." });
    }

    next();
};
