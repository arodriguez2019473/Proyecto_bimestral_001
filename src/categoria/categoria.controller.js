import { request,  response } from 'express';
import Categoria from './categoria.model.js';

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

export const categoriaDelete = async(req,res) =>{
    console.log('categoriaDelete');
    const {categoria} = req.query;





}

/*

    try {
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query).skip(Number(desde)).limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            categorias
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

export const getCategoriaById = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findById(id);
        res.status(200).json({
            categoria
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

export const categoriaDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Categoria.findByIdAndUpdate(id, { estado: 'inactivo' });
        res.status(200).json({
            msg: 'La categoría ha sido eliminada exitosamente',
            categoria
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const putCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    try {
        const categoria = await Categoria.findByIdAndUpdate(id, { nombre, descripcion }, { new: true });
        res.status(200).json({
            msg: 'Categoría actualizada exitosamente',
            categoria
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const categoriaPost = async (req, res) => {
    const { nombre, descripcion } = req.body;
    const categoria = new Categoria({ nombre, descripcion });

    try {
        await categoria.save();
        res.status(201).json({
            categoria
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

module.exports = {
    getCategoriaById,
    categoriasGet,
    categoriaDelete,
    putCategoria,
    categoriaPost
};
*/