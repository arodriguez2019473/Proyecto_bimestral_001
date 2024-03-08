import Role from '../roles/role.model.js';
import Admin from '../admin/admin.model.js';
import Cliente from '../cliente/cliente.model.js';
import Producto from '../producto/producto.model.js'

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if (!existeRol){
        throw new Error(`El role ${role} no existe en la base de datos`);
    }
}

export const existenteEmail = async (correo = '') => {
    const existeEmailAdmin = await Admin.findOne({correo});
    const existeEmailCliente = await Cliente.findOne({correo});
    
    if (existeEmailAdmin || existeEmailCliente){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuarioAdmin = await Admin.findById(id);
    const existeUsuarioCliente = await Cliente.findById(id);
    
    if (!existeUsuarioAdmin && !existeUsuarioCliente){
        throw new Error(`El ID: ${id} no existe`);
    }
}
export const existeProductoById = async (id = '') =>{
    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`el id ${id} no existe`);
    }
}


