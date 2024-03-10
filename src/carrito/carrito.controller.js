import { response, request } from 'express';
import Carrito from "./carrito.model.js";
import carrito from "./carrito.model.js";
import Producto from "../producto/producto.model.js"


export const carritosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, carritos] = await Promise.all([
        Carrito.countDocuments(query),
        Carrito.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        carritos
    });

}

export const getCarritoById = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({
        carrito
    })    

};


export const putCarrito = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, cantidad, total, estado } = req.body;

    await Carrito.findByIdAndUpdate (id, resto);
    const carrito = await Carrito.findOne({_id: id});

    res.status(200).json({
        msg: 'carrito actualizado',
        carrito
    });
};
/*
export const carritoPost = async (req, res) => {
    const { nombre, cantidad, total, estado } = req.body;

    try {
        const productoExistente = await Carrito.findOne({ nombre });

        if (productoExistente) {
            return res.status(400).json({
                msg: 'El producto ya está en el carrito'
            });
        }

        const carrito = new Carrito({ nombre, cantidad, total, estado });
        await carrito.save();

        res.status(201).json({
            msg: 'Producto agregado al carrito',
            carrito
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};
*/

export const carritoPost = async (req, res) => {
    const { nombre, cantidad } = req.body;

    try {
        // Verificar si el producto existe
        const producto = await Producto.findOne({ nombre });
        if (!producto) {
            return res.status(404).json({ msg: 'El producto no existe' });
        }

        // Verificar si el producto ya está en el carrito
        const productoExistente = await Carrito.findOne({ nombre });
        if (productoExistente) {
            return res.status(400).json({ msg: 'El producto ya está en el carrito' });
        }

        // Crear el objeto para el carrito
        const nuevoProductoEnCarrito = new Carrito({
            nombre: producto.nombre,
            cantidad: cantidad,
            precio: producto.precio
        });
        await nuevoProductoEnCarrito.save();

        res.status(201).json({ msg: 'Producto agregado al carrito', productoEnCarrito: nuevoProductoEnCarrito });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

