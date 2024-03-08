import { Router } from "express";
import { check } from "express-validator";

import {

    productoDelete,
    productoPost,
    productosGet,
    getProductoById,
    putProducto

}from './producto.controller.js'
  
import { tieneRole } from "../middlewares/validar-roles.js";
import { existeProductoById } from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";



const router = Router();

router.get("/", productosGet);


router.get(
    "/:id",
    [
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeProductoById),
      validarCampos,
    ],
    getProductoById
  );

router.post(
    "/",
    [
        validarJWT,
        check('nombre', 'el nombre del producto es obligatorio').not().isEmpty(),
        check('precio', 'el precio del producto es obligatorio').not().isEmpty(),
        check('descripcion', 'la descripción del producto es obligatoria').not().isEmpty(),
        check('categoria', 'la categoría donde se encuentra es obligatoria').not().isEmpty(),
        check('disponible', 'la disponibilidad del producto es obligatoria').not().isEmpty(),

        validarCampos,
    ],
    productoPost
);

router.put(
    "/:id",
    [
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeProductoById),
      validarCampos,
    ],
    putProducto
  );

router.delete(
    "/:id",
    [
      validarJWT,
      check("id", "No es un ID válido").isMongoId(),
      check("id").custom(existeProductoById),
      validarCampos,
    ],
    productoDelete
);


    export default router;
