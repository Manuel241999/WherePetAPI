import Usuario from "../models/Usuario.js";
import Mascota from "../models/Mascota.js";
import ZonaGeofence from "../models/ZonaGeofence.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
//crea y fima yn JWT
const crearToken = (usuario, secreta, expiresIn) => {
  const { id, email, nombre } = usuario;

  return jwt.sign({ id,email,nombre }, secreta, { expiresIn });
};

const resolvers = {
  Query: {
    //AQUI VAN SIEMPRE LOS SELECTS
    
    obtenerMascotas: async (_, {input}, ctx) => {
      const mascotas = await Mascota.find({ usuarioId: ctx.usuario.id }).where('mascota').equals(input.mascota);
      return mascotas;
    },
  
      obtenerZonas: async (_, { input }, ctx) => {
        // Usando el campo `idUsuario` directamente desde el `input`
        const zonaGeofence = await ZonaGeofence.find({ usuarioId: input.idUsuario });
        return zonaGeofence;
      },
  },
  Mutation: {
    crearUsuario: async (_, { input }) => {
      const { email, password } = input;

      const existeUsuario = await Usuario.findOne({ email });
      //Si existe usuario
      if (existeUsuario) {
        throw new Error("El usuario ya esta registrado");
      }

      try {
        //Hashea password
        const salt = await bcryptjs.genSalt(10); //genera una cadena muy dificil de adivinar
        input.password = await bcryptjs.hash(password, salt);

        const nuevoUsuario = new Usuario(input);
        nuevoUsuario.save();
        return "Usuario Creado Correctamente";
      } catch (error) {
        console.log(error);
      }
    },
    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;

      const existeUsuario = await Usuario.findOne({ email });
      //Si el usuario no existe
      if (!existeUsuario) {
        throw new Error("El usuario no existe");
      }

      //Si el password es correcto
      const passwordCorrecto = await bcryptjs.compare(
        password,
        existeUsuario.password
      );

      if (!passwordCorrecto) {
        throw new Error("Password Incorrecto");
      }

      //Dar acceso a la app
      return {
        token: crearToken(existeUsuario, process.env.JWT_SECRET, "8hr"),
      };
    },
  

    //Mascota:
    nuevaMascota: async (_, { input }, ctx) => {
      //console.log("🚀 ~ nuevoProyecto: ~ ctx:", ctx)
      try {
        const mascota = new Mascota(input);

        mascota.usuarioId = ctx.usuario.id;

        //Almacenarlo en la BD
        const resultado = await mascota.save();

        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    actualizarMascota: async (_, { id, input}, ctx) => {
      //Si la tarea existe o no
      let mascota = await Mascota.findById(id);
      
      if (!mascota) {
        throw new Error("Mascota no encontrada");
      }
      //si la persona que edita es el creador
      if (mascota.usuarioId.toString() !== ctx.usuario.id) {
        throw new Error("No tienes las credenciales para editar");
      }
      
      //Guardar y retornar la tarea
      mascota = await Mascota.findOneAndUpdate({_id:id},input,{new:true});

      return mascota;
    },
    eliminarMascota: async (_, { id }, ctx) => {
      //Revizar que el proyecto exista:
      let mascota = await Mascota.findById(id);

      if (!mascota) {
        throw new Error("Mascota no encontrada");
      }
      //Revizar que la persona que trata de editarlo, es el creador
      if (mascota.usuarioId.toString() !== ctx.usuario.id) {
        throw new Error("No tienes las credenciales para editar");
      }

      //Eliminar
      await Mascota.findOneAndDelete({ _id: id });
      return "Mascota Eliminada";
    },

    //ZonaGeofence:

    nuevaZona: async (_, { input }) => {
      //console.log("🚀 ~ nuevoProyecto: ~ ctx:", ctx)
      try {
        const zonaGeofence = new ZonaGeofence(input);

        //Almacenarlo en la BD
        const resultado = await zonaGeofence.save();

        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

  },
};

export default resolvers;
