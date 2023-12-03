import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createNativeStackNavigator();

import Principal from './paginas/Principal';
import Repositorios from './paginas/Repositorios';
import CriarRepositorio from './paginas/CriarRepositorio';
import InfoRepositorio from './paginas/InfoRepositorio';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CircularHeader = ({ title }) => (
    <View style={styles.circularHeader}>
        <Text style={styles.circularHeaderText}>{title}</Text>
    </View>
);

const renderHeaderLeft = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => navigation.goBack()}>
            <FontAwesome5 name="angle-left" size={24} color={'#f3f3f3'} />
        </TouchableOpacity>
    );
};

export default function Rotas() {
    return (
        <NavigationContainer  >
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerTitle: (props) => <CircularHeader {...props} />,
                    headerStyle: {
                        backgroundColor: route.name === 'Home' ? "#7e8c94" : "#3b4b54",
                        borderBottomColor: route.name === 'Home' ? "#3b4b54" : "#3b4b54",
                        borderRadius: route.name === 'Home' ? 25 : 0,
                    },
                    headerTitleStyle: {
                        color: "#354",
                        fontSize: 20
                    },
                })}>
                <Tab.Screen name="Home"
                    options={() => ({
                        headerShown: true,
                        headerTitle: (props) => <CircularHeader title={"Controle Financeiro"} />,
                        headerStyle: {
                            backgroundColor: "#fff",
                            borderBottomColor: "#fff",
                            borderBottomWidth: 2,
                        },
                        headerTitleStyle: {
                            color: "#fff",
                            fontSize: 28
                        },
                        title: "Nossos gastos",
                    })}
                    component={Repositorios} />
                <Tab.Screen name="Principal" component={Principal}
                    options={({ navigation }) => ({
                        headerShown: true,
                        headerTitle: "Cadastro",
                        headerTitleStyle: {
                            color: "#fff",
                            fontSize: 20
                        },
                        headerLeft: () => renderHeaderLeft({ navigation }),

                        title: "Nossos gastos",
                    })}
                />
                <Tab.Screen name="CriarRepositorio" options={{ title: "Criar Repositório" }} component={CriarRepositorio} />
                <Tab.Screen name="InfoRepositorio" options={{ title: "Repositório Info" }} component={InfoRepositorio} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    circularHeader: {
        width: "96%",
        height: 50,
        marginTop: 20,
        alignContent: 'center',
    },
    circularHeaderText: {
        color: '#456',
        fontSize: 22,
    },
});