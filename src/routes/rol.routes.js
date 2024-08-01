import { Router } from "express";
import {methods as rolController} from "./../controllers/rol.controller"
import { validateRolId,validateRol } from "../validations/rol.validations";

const router=Router();

router.get("/", rolController.getRoles);
router.get("/:id",validateRolId, rolController.getRol);
router.post("/",validateRol, rolController.addRol);
router.put("/:id",validateRolId, rolController.updateRol);
router.delete("/:id",validateRolId, rolController.deleteRol);

export default router;