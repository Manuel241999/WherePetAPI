import mongoose from "mongoose";

const zonaGeofenceSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    latitud: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitud: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true, 
  }
);

const ZonaGeofence = mongoose.model("ZonaGeofence", zonaGeofenceSchema);

export default ZonaGeofence;
