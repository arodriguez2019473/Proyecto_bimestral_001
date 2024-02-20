const { Schema, model } = require('mongoose');
const Categoria = require('../models/categoria');
const { response } = require('express');

const categoriasGet = async (req, res = response) => {
    const { limite , desde } = req.query;
    const query = { estado: 'activo' };

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

const getCategoriaById = async (req, res) => {
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

const categoriaDelete = async (req, res) => {
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
