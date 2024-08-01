import { Router } from "express";
import {methods as appointmentController} from "../controllers/appointment.controller"
import { validateAppointmentId,validateAppointment } from "../validations/appointment.validations";


const router=Router();

router.get("/", appointmentController.getAppointments);
router.get("/:id",validateAppointmentId, appointmentController.getAppointment);
router.post("/",validateAppointment, appointmentController.addAppointment);
router.put("/:id",validateAppointmentId, appointmentController.updateAppointment);
router.delete("/:id",validateAppointmentId, appointmentController.deleteAppointment);

export default router;