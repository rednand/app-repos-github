import React from 'react';
import Rotas from './src/rotas';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

const queryClient = new QueryClient();

export default function App() {
  return (

    <QueryClientProvider client={queryClient}>
      <Rotas />
    </QueryClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => App);
