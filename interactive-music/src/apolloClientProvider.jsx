import React, { ReactElement, ReactNode, useMemo } from "react";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from "@auth0/auth0-react";
import { persistCache, LocalStorageWrapper  } from 'apollo3-cache-persist';

/**
 * ApolloProvider with the client
 */
export default function GqlProvider({
                                        children,
                                    }) {
    const { getAccessTokenSilently } = useAuth0();

    const cache = useMemo(() => new InMemoryCache(), []); // Wrap in useMemo

    /*useMemo(async () => {
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      });
    }, [cache]); // Make sure to include cache in dependency array
    */
    const client = useMemo(() => {
        const httpLink = new HttpLink({
            uri: process.env.REACT_APP_API_SERVER_URL || "http://localhost:4000/graphql",
        });

        const authLink = setContext(async (_, { headers }) => {
            try {
                const token = await getAccessTokenSilently();
                return {
                    headers: {
                        ...headers,
                        authorization: token ? `Bearer ${token}` : "",
                    },
                };
            } catch (e) {
                return { headers: { ...headers } };
            }
        });

        return new ApolloClient({
            link: from([authLink, httpLink]),
            cache,
        });
    }, [getAccessTokenSilently, cache]); // Include getAccessTokenSilently and cache in dependency array

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
}