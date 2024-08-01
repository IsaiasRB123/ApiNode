import { Router } from "express";
import {methods as detappointmentController} from "../controllers/det.appointment.controller"

const router=Router();

router.get("/", detappointmentController.getDetAppointments);
router.get("/:id", detappointmentController.getDetAppointment);

export default router;