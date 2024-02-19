const { Schema, model } = require('mongoose');

const ProductoSchema = Schema ({
   
    nombre: {
    
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },

    precio: {
    
        type: Number,
        required: [true, 'El precio del producto es obligatorio']
    },

    descripcion: {
        type: String,
        require: [true, 'pon la descripcion del producto']
    },
    
    categoria: {
    
        type: String,
        required: [true, 'La categoría del producto es obligatoria']
    },
    
    disponible: {
    
        type: Boolean,
        default: true
    }
});


module.exports = model('Producto', ProductoSchema);
