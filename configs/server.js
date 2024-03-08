'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';

import adminRoutes from  '../src/admin/admin.routes.js';
import clienteRoutes from  '../src/cliente/cliente.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import productoRoutes from '../src/producto/producto.routes.js'
import categoriaRoutes from '../src/categoria/categoria.routes.js'

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/ventasOnline/v1/admin'
        this.clientePath = '/ventasOnline/v1/cliente'
        this.authPath = '/ventasOnline/v1/auth'
        this.productoPath = '/ventasOnline/v1/producto'
        this.categoriaPath = '/ventasOnline/v1/categoria'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){

        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.clientePath, clienteRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.productoPath, productoRoutes);
        this.app.use(this.categoriaPath, categoriaRoutes);

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;