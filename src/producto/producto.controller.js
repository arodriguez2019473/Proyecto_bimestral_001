import { response, request } from 'express';
import Producto from './producto.model.js'
import Categoria from '../categoria/categoria.model.js'

export const productosGet = async (req = request, res = response) => {

    const { limite, desde } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        
        Producto.countDocuments(query),
        Producto.find(query)
            .skip(Number(desde))
            .limit(Number(limite))     
    ]);

    res.status(200).json({
        total,
        productos
    });
}

export const getProductoById = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findOne({_id: id});
    
    res.status(200).json({
        producto
    })


};

export const productoDelete = async (req, res) => {
    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false });
    const productoAutenticado = req.producto;

    res.status(200).json({
        msg:'producto eliminado',
        producto,
        productoAutenticado
    });
};

export const putProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, descripcion, categoria, disponible } = req.body;

    try {
        let cat = await Categoria.findOne({ categoria1: categoria });

        if (!cat) {
            if (!categoria) {
                return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
            }

            cat = new Categoria({ categoria1: categoria });
            await cat.save();
        }

        const producto = await Producto.findByIdAndUpdate(
            id,
            { nombre, precio, descripcion, categoria: cat._id, disponible },
            { new: true }
        );

        res.status(200).json({
            msg: 'Producto actualizado exitosamente',
            producto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
};

export const productoPost = async (req, res) => {

    const { nombre, precio, descripcion, categoria, disponible } = req.body;

    let cat = await Categoria.findOne({ categoria1: categoria });

    if (!cat) {
        if (!categoria) {
            return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
        }

        cat = new Categoria({ categoria1: categoria });
        await cat.save();
    }

    const producto = new Producto({ nombre, precio, descripcion, categoria: cat._id, disponible });

    await producto.save();

    res.status(200).json({
        producto
    });
};
