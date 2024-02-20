const { Schema, model } = require('mongoose');

const ClienteSchema = Schema ({

    nombre: {
    
        type: String,
        required: [true, 'El nombre del cliente es obligatorio']
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
        default: "USER_CLIENT"
    },
    
    estado: {
    
        type: Boolean,
        default: true
    }
});

module.exports = model('Cliente', ClienteSchema);
