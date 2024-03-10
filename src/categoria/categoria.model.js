import mongoose from "mongoose";

const CategoriaSchema = mongoose.Schema ({

    categoria1: {
    
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio']
    },
    
    estado: {

    type: Boolean,
    default: true       
    }
    
});

export default mongoose.model('Categoria', CategoriaSchema)