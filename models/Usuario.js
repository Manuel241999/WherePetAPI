import mongoose from 'mongoose'
const UsuariosSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type: String,
        required: true,
        trim:true
    },
    registro:{
        type: Date,
        default:Date.now()
    },
    collar: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ZonaGeofence",
      }],
})

const Usuario = mongoose.model("Usuario", UsuariosSchema);
export default Usuario;
