import mongoose from "mongoose";

const CategoriaSchema = mongoose.Schema ({

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

export default mongoose.model('Categoria', CategoriaSchema)