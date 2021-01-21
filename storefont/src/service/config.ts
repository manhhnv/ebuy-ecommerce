import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://0.0.0.0:3000/ebuy-graphql',
    cache: new InMemoryCache()
})