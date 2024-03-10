import { Router } from "express";
import { check } from "express-validator";

import { categoriaPost, categoriaGet, categoriaDelete } from "./categoria.controller.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";

const router = Router();

router.get("/", categoriaGet);

router.post(
    '/:postId',
    [
        validarJWT,
        check("categoria1", "se debe agregar categoria").not().isEmpty(),
        validarCampos,
    ],
    categoriaPost
);

router.delete(
    "/:id",
    [
      validarJWT,
      check("id", "No es un ID válido").isMongoId(),
      validarCampos,
    ],
    categoriaDelete
);


    export default router;