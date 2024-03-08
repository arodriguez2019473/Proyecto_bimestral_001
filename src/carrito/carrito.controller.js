import { reponse, request } from "express"
import Carrito from "./carrito";
import carrito from "./carrito";


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

export const carritoPost = async (req, res) => {
    const { nombre, cantidad, total, estado } = req.body;
    const carrito = new Carrito({ nombre, cantidad, total, estado });

    try {
        await carrito.save();
        res.status(201).json({
            carrito
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};
