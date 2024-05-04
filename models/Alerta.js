import mongoose from "mongoose";

const alertaSchema = mongoose.Schema(
  {
    tipo: {
        type: String,
        required: true,
        enum: ["bateria", "entrada-salida","OutLine","inactividad"], 
      },
      fecha: {
        type: Date,
        default: Date.now(),
      },
      mascotaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mascota",
      },
  },
  {
    timestamps: true, 
  }
);

const Alerta = mongoose.model("ZonaGeofence", alertaSchema);

export default Alerta;
