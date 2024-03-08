import { Router } from "express";
import { check } from "express-validator";

import { login } from "./auht.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { esRoleValido } from "../helpers/db-validators.js";
const router = Router()

router.post(
    '/login',
    [
        check('correo', 'Este no es un correo válido').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('role', 'ingresar el rol').not().isEmpty(),
        validarCampos,
    ], login)

export default router