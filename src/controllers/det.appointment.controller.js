import {getConnection} from "../database/database"

const getDetAppointments= async (req, res)=>{
    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT id, subtotal, Id_cita, Id_servicio FROM detalle_cita");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);

    }
};

const getDetAppointment= async (req, res)=>{
    try{
        console.log(req.params)
        const  {id} = req.params;
        const connection= await getConnection();
        const result = await connection.query("SELECT id, subtotal, Id_cita, Id_servicio FROM detalle_cita WHERE id = ?", id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);

    }
};

export const methods ={
    getDetAppointments,
    getDetAppointment
};