import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createNativeStackNavigator();

import Principal from './paginas/Principal';
import Repositorios from './paginas/Repositorios';
import CriarRepositorio from './paginas/CriarRepositorio';
import InfoRepositorio from './paginas/InfoRepositorio';

export default function Rotas() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" options={{ title: "Controle de Finanças" }} component={Repositorios} />
                <Tab.Screen name="Principal" component={Principal} />
                <Tab.Screen name="CriarRepositorio" options={{ title: "Criar Repositório" }} component={CriarRepositorio} />
                <Tab.Screen name="InfoRepositorio" options={{ title: "Repositório Info" }} component={InfoRepositorio} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}