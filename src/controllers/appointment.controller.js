import {getConnection} from "../database/database"

const getAppointments= async (req, res)=>{
    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT id, hora_inicio, hora_fin, fecha, total, estado, cliente, empleado FROM citas");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);

    }
};

const getAppointment= async (req, res)=>{
    try{
        console.log(req.params)
        const  {id} = req.params;
        const connection= await getConnection();
        const result = await connection.query("SELECT id, hora_inicio, hora_fin, fecha, total, estado, cliente, empleado FROM citas WHERE id = ?", id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);

    }
};

const addAppointment= async (req, res) =>{
    try{
        const {hora_inicio,hora_fin,fecha,total,estado,cliente,empleado}=req.body;

        if(hora_inicio == undefined  || hora_fin== undefined  || fecha == undefined  || total == undefined  || estado == undefined  ||cliente == undefined  || empleado==undefined){
            res.status(400).json({message:"Bad request. Please fill all filed"});
        }
        const cita={
            hora_inicio,hora_fin,fecha,total,estado,cliente,empleado
        };
        
        const connection = await getConnection();
        await connection.query("INSERT INTO citas SET ?",cita );
        res.json({message:"Cita añadida"});
    }catch(error){
        res.status(500);
        res.send(error.message)

    }
};

const updateAppointment= async (req, res)=>{
    try{
        console.log(req.params)
        const  {id} = req.params;
        const {hora_inicio,hora_fin,fecha,total,estado,cliente,empleado}=req.body;
        if(id == undefined || hora_inicio == undefined  || hora_fin== undefined  || fecha == undefined  || total == undefined  || estado == undefined  ||cliente == undefined  || empleado==undefined ){
            res.status(400).json({message:"Bad request. Please fill all filed"});
        }
        const cita={
            id,hora_inicio,hora_fin,fecha,total,estado,cliente,empleado
        };
        const connection= await getConnection();
        const result = await connection.query("UPDATE citas SET ? WHERE id = ?", [cita, id]);
        res.json({ message: "Cita actualizada" });
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};


const deleteAppointment= async (req, res)=>{
    try{
        console.log(req.params)
        const  {id} = req.params;
        const connection= await getConnection();
        const result = await connection.query("DELETE FROM citas WHERE id = ?", id);
        res.json({ message: "Cita eliminada" });
    }catch(error){
        res.status(500);
        res.send(error.message);

    }
};



export const methods ={
    getAppointments,
    addAppointment,
    getAppointment,
    deleteAppointment,
    updateAppointment
};