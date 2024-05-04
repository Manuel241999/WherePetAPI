import { gql } from "apollo-server";

const typeDefs = gql`
  
  type Query {
    obtenerMascotas(input: MascotaIDInput): [Mascota]
    obtenerZonas(input: ZonaIDInput): [Zona]
  }
  
  type Token {
    token: String
  }
  type Mascota {
    nombre: String!
    especie: String!
    raza: String!
    usuarioId: ID
  }
  type Zona {
    nombre: String!
    latitud: Float!
    longitud: Float!
    usuarioId: ID
  }

  
  input MascotaIDInput {
    idUsuario: String!
  }
  input ZonaIDInput {
    idUsuario: String!
  }

  input UsuarioInput {
    nombre: String!
    email: String!
    password: String!
  }
  input AutenticarInput {
    email: String!
    password: String!
  }
  

  input MascotaInput {
    nombre: String!
    especie: String!
    raza: String!
    usuarioId: String!
  }
  input ZonaInput {
    nombre: String!
    latitud: Float!
    longitud: Float!
    usuarioId: String!
  }

  type Mutation {
    # Usuarios
    crearUsuario(input: UsuarioInput): String
    autenticarUsuario(input: AutenticarInput): Token

    # Mascotas
    nuevaMascota(input: MascotaInput): Mascota
    actualizarMascota(id: ID!, input: MascotaInput): Mascota
    eliminarMascota(id: ID!): String

    # Zonas
    nuevaZona(input: ZonaInput): Zona
  }
`;

export default typeDefs;
