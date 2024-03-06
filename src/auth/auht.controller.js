import bcryptjs from 'bcryptjs';
import admin from '../admin/admin';;
import cliente from '../cliente/cliente';
import { generarJWT } from ''
import admin from '../admin/admin';

export const login = async (req, res) =>{
    const { correo, password } = req.body;

    try {
           
        const admin = await admin.findOne({ correo });

        if
    
    } 
    catch (e) {
        
    }
}
