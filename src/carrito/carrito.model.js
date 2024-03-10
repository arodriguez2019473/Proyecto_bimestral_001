import mongoose from 'mongoose';

const CarritoSchema = mongoose.Schema ({

    nombre:{
        type: String,
        require: [true, 'el nombre del producto es obligatorio']
    },

    cantidad:{
        type: String,
        require: [true, 'el carrito debe tener almenos 1 producto']
    },

    precio:{
        type: String,
        default: 0
    },

    estado:{
        type: String,
        enum: ["pendiente", "completado", "cancelado"],
        default: "pendiente"
    }

});

export default mongoose.model('Carrito', CarritoSchema )