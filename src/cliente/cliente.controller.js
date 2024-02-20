const bcryptjs = require('bcryptjs');
const Cliente = require('../models/cliente');
const { response } = require('express');

const clientesGet = async (req, res = response) => {
    const { limite , desde } = req.query;
    const query = { estado: true };

    try {
       
        const [total, clientes] = await Promise.all([
       
            Cliente.countDocuments(query),
            Cliente.find(query).skip(Number(desde)).limit(Number(limite))
       
        ]);

        res.status(200).json({
       
            total,
            clientes
        });
    } 
    catch (e) {
    
        console.log(e);
        res.status(500).json({
    
            msg: 'Error en el servidor'
        });
    }
};

const getClienteById = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findById(id);
        res.status(200).json({
            cliente
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const clienteDelete = async (req, res) => {
    const { id } = req.params;

    try {
        
        const cliente = await Cliente.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({
        
            msg: 'El cliente ha sido eliminado exitosamente',
            cliente
        });
    } catch (e) {

        console.log(e);
        res.status(500).json({
        
            msg: 'Error en el servidor'
        });
    }
};

const putCliente = async (req, res = response) => {
    
    const { id } = req.params;
    const { _id, password, correo, nombre, ...resto } = req.body;

    try {
    
        if (password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        const cliente = await Cliente.findByIdAndUpdate(id, resto);
        res.status(200).json({
            msg: 'Cliente actualizado exitosamente',
            cliente
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            
            msg: 'Error en el servidor'
        });
    }
};

const clientePost = async (req, res) => {
  
    const { nombre, correo, password } = req.body;
    const cliente = new Cliente({ nombre, correo, password });

    cliente.role = 'USER_CLIENT';

    const salt = bcryptjs.genSaltSync();
  
    cliente.password = bcryptjs.hashSync(password, salt);

    try {
        await cliente.save();
        res.status(201).json({
            cliente
        });
    }
    catch (e) {
        
        console.log(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

module.exports = {
    getClienteById,
    clientesGet,
    clienteDelete,
    putCliente,
    clientePost
};
