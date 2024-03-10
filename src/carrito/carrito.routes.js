import { Router } from "express";
import { check } from "express-validator";
import { carritoPost } from "./carrito.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre del producto es obligatorio").not().isEmpty(),
        check("cantidad", "La cantidad debe ser un número entero mayor que cero").isInt({ min: 1 }),
    ],
    carritoPost
);

export default router;
