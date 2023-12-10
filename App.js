import React from 'react';
import Rotas from './src/rotas';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export default function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <Rotas />
    </QueryClientProvider>
  );
}
