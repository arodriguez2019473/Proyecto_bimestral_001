import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
 
        nombre: {
          type: String,
          required: [true, "El nombre es obligatorio"],
        },
        
        correo: {
          type: String,
          required: [true, "El correo es obligatorio"],
          unique: true,
        },
        
        password: {
          type: String,
          required: [true, "La contraseña es obligatoria"],
        },

        role: {
          type: String,
          required: true,
          enum : ["ADMIN_ROLE"],
        },
        
        estado: {
          type: Boolean,
          default: true,
        }

    });

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema);