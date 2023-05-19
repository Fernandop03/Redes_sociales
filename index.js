import Faker from "faker";
import { ApolloServer } from 'apollo-server';
import {typeDefs} from './schema.js';
import { resolvers } from "./resolvers.js";

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    
    const {url} = await server.listen()
    console.log('Server is running on', url)
}

startApolloServer()


console.log(Faker)


