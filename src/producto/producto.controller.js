const { Schema, model } = require('mongoose');
const Producto = require('../models/producto');
const { response } = require('express');

const productosGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = {};

    try {
        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query).skip(Number(desde)).limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            productos
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const getProductoById = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findById(id);
        res.status(200).json({
            producto
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const productoDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'El producto ha sido eliminado exitosamente',
            producto
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const putProducto = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, precio, descripcion, categoria, disponible } = req.body;

    try {
        const producto = await Producto.findByIdAndUpdate(id, { nombre, precio, descripcion, categoria, disponible }, { new: true });
        res.status(200).json({
            msg: 'Producto actualizado exitosamente',
            producto
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const productoPost = async (req, res) => {
    const { nombre, precio, descripcion, categoria, disponible } = req.body;
    const producto = new Producto({ nombre, precio, descripcion, categoria, disponible });

    try {
        await producto.save();
        res.status(201).json({
            producto
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

module.exports = {
    getProductoById,
    productosGet,
    productoDelete,
    putProducto,
    productoPost
};
