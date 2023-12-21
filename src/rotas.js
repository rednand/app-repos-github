import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Cadastro from './paginas/Cadastro';
import Home from './paginas/Home';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import imageUrl from "./../assets/logo.png"
import icon from "./../assets/semente-do-cafe.png"
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';

export default function Rotas() {

    const Tab = createDrawerNavigator();

    const CircularHeader = ({ title }) => (
        <View style={styles.circularHeader}>
            <View style={styles.headerContent}>
                <Text style={styles.circularHeaderText}>{title}</Text>
                <Image source={icon} style={styles.headerImage} />
            </View>
        </View>
    );

    const renderHeaderLeft = ({ navigation }) => {
        return (
            <TouchableOpacity
                style={{ marginLeft: 15 }}
                onPress={() => navigation.goBack()}>
                <FontAwesome5 name="angle-left" size={24} color={'#212121'} />
            </TouchableOpacity>
        );
    };

    const CustomDrawerContent = props => {
        return (
            <DrawerContentScrollView style={{ backgroundColor: "#cbfb74", paddingVertical: 20 }}{...props}>
                <View style={{ alignItems: 'center', backgroundColor: "#cbfb74", paddingVertical: 20 }}>
                    <Image
                        resizeMode="contain"
                        source={icon}
                        style={{ width: 150, height: 60 }}
                    />
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        );
    };

    return (
        <NavigationContainer  >
            <StatusBar style="dark" />
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    headerTitle: (props) => <CircularHeader {...props} />,
                    headerStyle: {
                        backgroundColor: "#cbfb74",
                    },
                    headerTitleStyle: {
                        fontSize: 20
                    },
                }}
                drawerContent={props => <CustomDrawerContent {...props} />}
            >
                <Tab.Screen name="Home"
                    options={() => ({
                        headerShown: true,
                        headerTitle: () => <CircularHeader title={"MEUS GASTOS"} />,
                        headerTitleStyle: {
                            color: "#fff",
                            fontSize: 20
                        },
                    })}
                    component={Home} />
                <Tab.Screen name="Principal" component={Cadastro}
                    options={({ navigation }) => ({
                        headerShown: true,
                        headerTitle: "Cadastro",
                        headerTitleStyle: {
                            color: "#212121",
                            fontSize: 20
                        },
                        headerLeft: () => renderHeaderLeft({ navigation }),

                        title: "Cadastro de gasto",
                    })}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        display: "flex",
        justifyContent: "space-between",
        alignContent: 'center',
        width: 40,
        height: 40,
        marginLeft: 125,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    circularHeader: {
        width: "160%",
        paddingVertical: 5,
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
    },
    circularHeaderText: {
        color: '#212121',
        fontWeight: "bold",
        alignSelf: "center",
        fontSize: 22,
    },
});