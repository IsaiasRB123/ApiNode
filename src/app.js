import express from "express";
import morgan from "morgan";

import userRoutes from "./routes/user.routes";
import appointmentRoutes from "./routes/appointment.routes";
import detappointmentRoutes from "./routes/det.appointment.routes";
import rolRoutes from "./routes/rol.routes";
import programming_EmployeeRoutes from "./routes/programming_Employee.routes";
import absenceRoutes from "./routes/absence.routes";
import shoppingRoutes from "./routes/shopping.routes";


const app=express();

//Settings
app.set("port", 4000);

//Middlewares

app.use(morgan("dev"));
app.use(express.json());


app.use("/api/usuarios",userRoutes);
app.use("/api/citas",appointmentRoutes);
app.use("/api/detalle_citas",detappointmentRoutes);
app.use("/api/roles",rolRoutes);
app.use("/api/programEmpleado",programming_EmployeeRoutes);
app.use("/api/ausencias",absenceRoutes);
app.use("/api/compras",shoppingRoutes);


export default app;