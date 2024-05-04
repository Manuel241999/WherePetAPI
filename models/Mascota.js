import mongoose from "mongoose";

const mascotaSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    especie: {
      type: String,
      required: true,
      enum: ["Perro", "Gato", "Otro"], //Esta onda solo permite los valores que esten en este array
    },
    raza: {
      type: String,
      required: true,
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true, //Para que nos cree las columnas de editado y creado
  }
);

const Mascota = mongoose.model("Mascota", mascotaSchema);

export default Mascota;
