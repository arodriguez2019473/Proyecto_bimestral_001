import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generate-jwt.js';
import Cliente from '../cliente/cliente.model.js';
import Admin from '../admin/admin.model.js';

export const login = async (req, res) => {
    const { correo, password, rol } = req.body;

    try {
        let usuario;

        if (rol === 'USER_CLIENT') {
            usuario = await Cliente.findOne({ correo });
        } else if (rol === 'USER_ADMIN') {
            usuario = await Admin.findOne({ correo });
        } else {
            return res.status(400).json({
                msg: "Rol de usuario no válido",
            });
        }

       if (!usuario) {
            return res.status(400).json({
                msg: "Credenciales incorrectas, correo no existe en la base de datos",
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El usuario no está activo",
            });
        }

        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "La contraseña es incorrecta",
            });
        }

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: '¡Inicio de sesión exitoso!',
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Por favor, comuníquese con el administrador",
        });
    }
}
