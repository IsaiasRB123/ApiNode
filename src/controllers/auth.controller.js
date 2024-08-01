import { getConnection } from "../database/database";
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const {promisify} = require("util");

exports.register = async (req, res)=>{
    const name = req.body.name
    const user = req.body.user
    const pass = req.body.pass
    console.log(name+" - "+ user + " - "+ pass)
    

    
}


const addAuth = async (req, res) => {
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

// Exportar los métodos para su uso en otros módulos
export const methods = {
    addAuth,
};
