import { getConnection } from "../database/database";


// Funciones de manejo de usuarios
const getUsers = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT id, Nombre_usuario, Correo, Contraseña, Telefono, estado, Id_rol FROM usuarios");
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query("SELECT id, Nombre_usuario, Correo, Contraseña, Telefono, estado, Id_rol FROM usuarios WHERE id = ?", [id]);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addUser = async (req, res) => {
    try {
        const { Nombre_usuario, Correo, Contraseña, Telefono, estado, Id_rol } = req.body;

        if (!Nombre_usuario || !Correo || !Contraseña || !Telefono || !estado || !Id_rol) {
            return res.status(400).json({ message: "Bad request. Please fill all fields" });
        }

        const usuario = { Nombre_usuario, Correo, Contraseña, Telefono, estado, Id_rol };
        const connection = await getConnection();
        await connection.query("INSERT INTO usuarios SET ?", usuario);
        res.json({ message: "Usuario añadido" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { Nombre_usuario, Correo, Contraseña, Telefono, estado, Id_rol } = req.body;

        if (!Nombre_usuario || !Correo || !Contraseña || !Telefono || !estado || !Id_rol) {
            return res.status(400).json({ message: "Bad request. Please fill all fields" });
        }

        const usuario = { Nombre_usuario, Correo, Contraseña, Telefono, estado, Id_rol };
        const connection = await getConnection();
        await connection.query("UPDATE usuarios SET ? WHERE id = ?", [usuario, id]);
        res.json({ message: "Usuario actualizado" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("DELETE FROM usuarios WHERE id = ?", [id]);
        res.json({ message: "Usuario eliminado" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Exportar los métodos para su uso en otros módulos
export const methods = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
};

