import {getConnection} from "./../database/database"

const getRoles= async (req, res)=>{
    try{
        const connection= await getConnection();
        const result = await connection.query("SELECT id, Nombre_rol, Estado FROM roles");
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);

    }
};

const getRol= async (req, res)=>{
    try{
        console.log(req.params)
        const  {id} = req.params;
        const connection= await getConnection();
        const result = await connection.query("SELECT id, Nombre_rol, Estado FROM roles WHERE id = ?", id);
        res.json(result);
    }catch(error){
        res.status(500);
        res.send(error.message);

    }
};

const addRol= async (req, res) =>{
    try{
        const {Nombre_rol,Estado}=req.body;

        if(Nombre_rol == undefined || Estado == undefined){
            res.status(400).json({message:"Bad request. Please fill all filed"});
        }
        const rol={
            Nombre_rol,Estado
        };
        
        const connection = await getConnection();
        await connection.query("INSERT INTO roles SET ?",rol );
        res.json({message:"Rol añadido"});
    }catch(error){
        res.status(500);
        res.send(error.message)

    }
};

const updateRol= async (req, res)=>{
    try{
        console.log(req.params)
        const  {id} = req.params;
        const {Nombre_rol,Estado}=req.body;
        if(id == undefined || Nombre_rol == undefined || Estado == undefined ){
            res.status(400).json({message:"Bad request. Please fill all filed"});
        }
        const rol={
            id,Nombre_rol,Estado
        };
        const connection= await getConnection();
        const result = await connection.query("UPDATE roles SET ? WHERE id = ?", [rol, id]);
        res.json({message:"Rol modificado"});
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};


const deleteRol= async (req, res)=>{
    try{
        console.log(req.params)
        const  {id} = req.params;
        const connection= await getConnection();
        const result = await connection.query("DELETE FROM roles WHERE id = ?", id);
        res.json({message:"Rol eliminado"});
    }catch(error){
        res.status(500);
        res.send(error.message);

    }
};



export const methods ={
    getRoles,
    addRol,
    getRol,
    deleteRol,
    updateRol
};