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
        check("categoria1", "se debe agregar categoria").not().isEmpty(),
        validarCampos,
    ],
    categoriaPost
);

    export default router;