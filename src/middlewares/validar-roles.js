export const tieneRole = (...roles) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar un role sin validar el token primero'
            });
        }
        let rolUsuario;

        if (req.usuario.role === 'USER_CLIENT') {
            rolUsuario = 'cliente';
        }

        if (req.usuario.role === 'USER_ADMIN') {
            rolUsuario = 'admin';
        }

        if (!roles.includes(rolUsuario)) {
            return res.status(401).json({
                msg: `Usuario no autorizado, posee un rol ${rolUsuario}, los roles autorizados son ${roles}`
            });
        }

        next();
    };
};
