"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retryDelay: 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        },
    },
});
function RQProviders({ children }: React.PropsWithChildren) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}

export default RQProviders;