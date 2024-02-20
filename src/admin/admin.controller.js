const bcryptjs = require('bcryptjs');
const Admin = require('../models/admin');
const { response } = require('express');

const adminsGet = async (req, res = response) => {

    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        const [total, admins] = await Promise.all([

            Admin.countDocuments(query),
            Admin.find(query).skip(Number(desde)).limit(Number(limite))
        
        ]);

        res.status(200).json({

            total,
            admins

        });
    } 
    
    catch (e) {

        console.log(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        res.status(200).json({
            admin
        });

    }

    catch (e) {
        console.log(e);

        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const adminDelete = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findByIdAndUpdate(id, { estado: false });
        res.status(200).json({
            msg: 'El administrador ha sido eliminado exitosamente',
            admin
        });
    } 

    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });

    }
};

const putAdmin = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, correo, nombre, ...resto } = req.body;

    try {
        if (password) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(password, salt);
        }

        const admin = await Admin.findByIdAndUpdate(id, resto);
        res.status(200).json({
            msg: 'Administrador actualizado exitosamente',
            admin
        });
    } 

    catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};

const adminPost = async (req, res) => {
    
    const { nombre, correo, password } = req.body;
    const admin = new Admin({ nombre, correo, password });

    admin.role = 'USER_ADMIN';

    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password, salt);

    try {
        await admin.save();
        res.status(201).json({
            admin
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
    getAdminById,
    adminsGet,
    adminDelete,
    putAdmin,
    adminPost
};

