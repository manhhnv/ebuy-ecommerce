import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'http://0.0.0.0:8080/ebuy-graphql',
    cache: new InMemoryCache()
})