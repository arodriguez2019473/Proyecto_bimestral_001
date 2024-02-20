const { Schema, model } = require('mongoose');

const CarritoSchema = Schema ({

    nombre:{
    
        type: String,
        require: [true, 'el nombre del producto es obligatorio']
    },

    cantidad:{
    
        type: String,
        require: [true, 'el carrito debe tener almenos 1 producto']
    },

    total:{
    
        type: String,
        default: 0
    },

    estado:{
    
        type: String,
        enum: ["pendiente", "completado", "cancelado"],
        default: "pendiente"
    }

});

module.exports = model('Carrito', CarritoSchema);
