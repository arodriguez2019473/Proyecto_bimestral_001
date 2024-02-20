const { Schema, model } = require('mongoose');

const AdminSchema = Schema ({
    
    nombre: {
    
        type: String,
        required: [true, 'El nombre del administrador es obligatorio']
    },
    
    correo: {
    
        type: String,
        required: [true, 'El correo electrónico es obligatorio']
    },
    
    password: {
    
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    
    role: {
    
        type: String,
        default: "USER_ADMIN"
    },
    
    estado: {
    
        type: Boolean,
        default: true
    }
});

module.exports = model('Admin', AdminSchema);
