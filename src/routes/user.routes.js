import { Router } from "express";
import {methods as userController} from "../controllers/user.controller"
import { validateUserId, validateUser } from "../validations/user.validations";


const router=Router();

router.get("/", userController.getUsers);
router.get("/:id",validateUserId, userController.getUser);
router.post("/",validateUser, userController.addUser);
router.put("/:id",validateUserId, userController.updateUser);
router.delete("/:id",validateUserId, userController.deleteUser);

export default router;