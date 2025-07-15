"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:5000/data",
  cache: new InMemoryCache(),
});

export default function ApolloProviders({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
