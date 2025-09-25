import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import connectDatabase from "./db/connectDb";
import { MONGO_URL, PORT } from "./config/env.config";
import { movieResolvers } from "./graphql/resolvers/movieResolvers";
import { movieTypeDefs } from "./graphql/schema";

const app = express();
app.use(express.json());

async function start() {
    try {
        await connectDatabase(MONGO_URL);

        const apolloServer = new ApolloServer({
            typeDefs: movieTypeDefs,
            resolvers: movieResolvers,
        });

        await apolloServer.start();
        console.log("Apollo Server started");

        app.use("/graphql", expressMiddleware(apolloServer));

        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}/graphql`);
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

start();
