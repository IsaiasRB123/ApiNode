import { getConnection } from "../database/database";

const getprogramacion_empleados = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT Id_programacion, Id_usuario, Hora_inicio, Hora_fin, estado, dia FROM programacion_empleados");
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};

const getProgram_empleado = async (req, res) => {
    try {
        console.log(req.params);
        const { Id_programacion } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT Id_programacion, Id_usuario, Hora_inicio, Hora_fin, estado, dia FROM programacion_empleados WHERE Id_programacion = ?", Id_programacion);
        if (result.length === 0) {
            res.status(404).json({ message: "Programación no encontrada" });
        } else {
            res.json(result);
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};

const addProgram_empleado = async (req, res) => {
    try {
        const { Id_usuario, Hora_inicio, Hora_fin, estado, dia } = req.body;

        if (Id_usuario === undefined || Hora_inicio === undefined || Hora_fin === undefined || estado === undefined || dia === undefined) {
            res.status(400).json({ message: "Solicitud incorrecta. Por favor, complete todos los campos" });
            return;
        }

        const Program_empleado = { Id_usuario, Hora_inicio, Hora_fin, estado, dia };
        const connection = await getConnection();
        await connection.query("INSERT INTO programacion_empleados SET ?", Program_empleado);
        res.json({ message: "Programación añadida con éxito" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};

const updateProgram_empleado = async (req, res) => {
    try {
        console.log(req.params);
        const { Id_programacion } = req.params;
        const { Id_usuario, Hora_inicio, Hora_fin, estado, dia } = req.body;

        if (Id_usuario === undefined || Hora_inicio === undefined || Hora_fin === undefined || estado === undefined || dia === undefined) {
            res.status(400).json({ message: "Solicitud incorrecta. Por favor, complete todos los campos" });
            return;
        }

        const Program_empleado = { Id_programacion, Id_usuario, Hora_inicio, Hora_fin, estado, dia };
        const connection = await getConnection();
        const result = await connection.query("UPDATE programacion_empleados SET ? WHERE Id_programacion = ?", [Program_empleado, Id_programacion]);
        res.json({ message: "Programación actualizada con éxito", result });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};

const deleteProgram_empleado = async (req, res) => {
    try {
        console.log(req.params);
        const { Id_programacion } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM programacion_empleados WHERE Id_programacion = ?", Id_programacion);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Programación no encontrada" });
        } else {
            res.json({ message: "Programación eliminada con éxito" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor: " + error.message });
    }
};

export const methods = {
    getprogramacion_empleados,
    getProgram_empleado,
    addProgram_empleado,
    updateProgram_empleado,
    deleteProgram_empleado
};