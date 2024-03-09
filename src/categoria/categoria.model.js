import mongoose from "mongoose";

const CategoriaSchema = mongoose.Schema ({

    categoria1: {
    
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio']
    },
    
    estado: {
    
        type: String,
        enum: ["activo", "inactivo"],
        default: "activo"
    }
    
});

export default mongoose.model('Categoria', CategoriaSchema)