import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import typeDefs from "./db/schema.js";
import  resolvers  from "./db/resolvers.js"
import jwt  from "jsonwebtoken"

dotenv.config();
//Conecta a la base de datos
conectarDB()

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context:({req}) => {
    //console.log(req.headers['authorization'])
    const token = req.headers['authorization'] || ''
    
    if(token){
      try {
        const usuario = jwt.verify(token.replace('Bearer', ''),process.env.JWT_SECRET)
        console.log("🚀 ~ usuario:", usuario)
        return{
          usuario
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

});

server.listen({port: process.env.PORT || 4000}).then(({ url }) => {
  console.log(`Servidor listo en la URL: ${url}`);
});
