const { Schema, model } = require('mongoose');
const Factura = require('../models/factura');
const { response } = require('express');

const facturasGet = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = {};

    try {
        const [total, facturas] = await Promise.all([
            Factura.countDocuments(query),
            Factura.find(query).skip(Number(desde)).limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            facturas
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const getFacturaById = async (req, res) => {
    const { id } = req.params;

    try {
        const factura = await Factura.findById(id);
        res.status(200).json({
            factura
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const facturaDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const factura = await Factura.findByIdAndDelete(id);
        res.status(200).json({
            msg: 'La factura ha sido eliminada exitosamente',
            factura
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const putFactura = async (req, res = response) => {
    const { id } = req.params;
    const { nombreF, total, cliente, fecha, estado } = req.body;

    try {
        const factura = await Factura.findByIdAndUpdate(id, { nombreF, total, cliente, fecha, estado }, { new: true });
        res.status(200).json({
            msg: 'Factura actualizada exitosamente',
            factura
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const facturaPost = async (req, res) => {
    const { nombreF, total, cliente, fecha, estado } = req.body;
    const factura = new Factura({ nombreF, total, cliente, fecha, estado });

    try {
        await factura.save();
        res.status(201).json({
            factura
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

module.exports = {
    getFacturaById,
    facturasGet,
    facturaDelete,
    putFactura,
    facturaPost
};
