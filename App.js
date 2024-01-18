import React, { useEffect } from 'react';
import Rotas from './src/rotas';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { ContextTokenProvider } from './src/service/auth';

const queryClient = new QueryClient();

export default function App() {

  return (

    <QueryClientProvider client={queryClient}>
      <ContextTokenProvider>
        <Rotas />
      </ContextTokenProvider>
    </QueryClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
