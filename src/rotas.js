import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createNativeStackNavigator();

import Principal from './paginas/Principal';
import Repositorios from './paginas/Repositorios';
import CriarRepositorio from './paginas/CriarRepositorio';
import InfoRepositorio from './paginas/InfoRepositorio';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import imageUrl from "./../assets/logoappbar.png"

const CircularHeader = ({ title }) => (
    <View style={styles.circularHeader}>
        {imageUrl && (
            <Image source={imageUrl} style={styles.headerImage} />
        )}
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
            <StatusBar style="light" />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerTitle: (props) => <CircularHeader {...props} />,
                    headerStyle: {
                        backgroundColor: "#101110",
                    },
                    headerTitleStyle: {
                        fontSize: 20
                    },
                })}>
                <Tab.Screen name="Home"
                    options={() => ({
                        headerShown: true,
                        headerTitle: (props) => <CircularHeader title={"NOSSO GASTO"} />,
                        headerTitleStyle: {
                            color: "#fff",
                            fontSize: 20
                        },
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
    headerImage: { borderRadius: 20, marginTop: 10, width: "100%", height: 60 },
    circularHeader: {
        width: "95%",
        marginRight: 5,
        marginTop: 20,
        marginBottom: 10,
        borderRadius: 20,
        alignContent: 'center',
    },
    circularHeaderText: {
        color: '#212121',
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: 22,
    },
});