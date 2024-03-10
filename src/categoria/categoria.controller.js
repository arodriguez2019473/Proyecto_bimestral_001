import { request,  response } from 'express';
import Categoria from './categoria.model.js';
import { ExpressValidator } from 'express-validator';
import Producto from '../producto/producto.model.js'

export const categoriaPost = async (req = request, res = response) => {
    try {
        const { categoria1 } = req.body;

        const newcat = new Categoria({ categoria1 });

        await newcat.save();

        res.status(200).json({
            categoria: newcat
        });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la categoría" });
    }
};

export const categoriaGet = async (req, res) => {
    
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, categorias] = await Promise.all([

            Categoria.countDocuments(query),
            Categoria.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        const categoriasConProductos = await Promise.all(categorias.map(async (categoria) => {

            const productos = await Producto.find({ categoria: categoria._id });
            return {
                categoria,
                productos
            };

        }));

        res.status(200).json({
            total,
            categorias: categoriasConProductos
        });
    } 
    catch (error) {
        res.status(500).json({ error: "Error al obtener las categorías y sus productos" });
    }
};



export const categoriaDelete = async (req, res) => {
    console.log('categoriaDelete');
    const { categoria } = req.query;

    if (!categoria) {
        return res.status(400).json({
            msg: "Categoría no existe, vuelve a ingresar el query"
        });
    }

    try {
        const p = producto;
        const cat = await Categoria.findById(categoria);

        if (!p) {
            cat.estado = false;
            await cat.save();
            
            return res.status(200).json({
                msg: "Categoría eliminada",
                categoria: cat
            });
        }

        cat.estado = false;
        p.categoria = 'Categoría eliminada';

        await Producto.findByIdAndUpdate(p.id.p, { categoria: 'Categoría eliminada' });
        await cat.save();

        res.status(200).json({
            msg: "Categoría eliminada",
            categoria: cat,
            producto: p
        });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la categoría" });
    }
};
