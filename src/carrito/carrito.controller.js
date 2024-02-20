const { Schema, model } = require('mongoose');
const Carrito = require('../models/carrito');
const { response } = require('express');

const carritosGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, carritos] = await Promise.all([
            Carrito.countDocuments(query),
            Carrito.find(query).skip(Number(desde)).limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            carritos
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const getCarritoById = async (req, res) => {
    const { id } = req.params;

    try {
        const carrito = await Carrito.findById(id);
        res.status(200).json({
            carrito
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const carritoDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const carrito = await Carrito.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({
            msg: 'El carrito ha sido eliminado exitosamente',
            carrito
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const putCarrito = async (req, res = response) => {
    const { id } = req.params;
    const { nombre, cantidad, total, estado } = req.body;

    try {
        const carrito = await Carrito.findByIdAndUpdate(id, { nombre, cantidad, total, estado }, { new: true });
        res.status(200).json({
            msg: 'Carrito actualizado exitosamente',
            carrito
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const carritoPost = async (req, res) => {
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

module.exports = {
    getCarritoById,
    carritosGet,
    carritoDelete,
    putCarrito,
    carritoPost
};
