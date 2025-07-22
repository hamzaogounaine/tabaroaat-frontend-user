"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_DATA_URL,
  cache: new InMemoryCache(),
});

export default function ApolloProviders({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
