import { Router } from "express";
import { check } from "express-validator";

import { categoriaPost } from "./categoria.controller.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.post(
    '/:postId',
    [
        validarJWT,
        check("nombre", "se debe agregar categoria").not().isEmpty(),
        check("descripcion", 'es necesario la descripcion').not().isEmpty(),
        check('estado',"es necesario el estado").not().isEmpty(),
        validarCampos,
    ],
    categoriaPost
);

    export default router;