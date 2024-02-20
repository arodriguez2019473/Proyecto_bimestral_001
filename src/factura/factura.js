const { Schema, model } = require('mongoose');

const FacturaSchema = Schema ({

    nombreF:{

    type: String,
    require: [true, "es necesario el nombre"]
    },

    total:{
    
    type: String,
    require: [true, "es necesario el total"]
    },

    cliente:{

    type: String,
    require: [true, "es necesario el nombre del cliente"]
    },

    fecha:{
    
    type: String,
    require: [true, "es necesario la fecha"]
    },

    estado:{

        type: String,
        enum: ["pendiente","pagada"],
        default: "pendiente"
    }

});

module.exports = model('Factura', FacturaSchema);