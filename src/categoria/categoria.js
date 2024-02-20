const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema ({

    nombre: {
    
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio']
    },

    descripcion: {
    
        type: String,
        required: [true, 'La descripción de la categoría es obligatoria']
    },
    
    estado: {
    
        type: String,
        enum: ["activo", "inactivo"],
        default: "activo"
    }
    
});

module.exports = model('Categoria', CategoriaSchema);
