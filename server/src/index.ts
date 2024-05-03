import express from 'express'
import {expressMiddleware} from '@apollo/server/express4'
import { ApolloServer } from '@apollo/server';

import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';

async function init() {
    const app = express()
    const PORT = process.env.PORT || 8000

    app.use(express.json());

    const gqlServer = new ApolloServer({
        typeDefs,
        resolvers: resolvers,
    })

    await gqlServer.start()
    
    app.get('/', (req, res) => {
        res.json({ message: 'Hello World' })
    })

    app.use('/graphql', expressMiddleware(gqlServer))
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
}

init();