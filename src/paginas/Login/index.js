import React, { useState } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ToastAndroid,
    Image,
} from "react-native";
import estilos from "./estilos";
import { useLogin } from "../../service/reqs/usuarios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import imageLogo from ">/../../assets/semente-do-cafe.png"

export default function Login() {
    const [usuario, setUsuario] = useState({ username: "", password: '', })
    const navigation = useNavigation();
    const { data, mutate, isLoading, isSuccess } = useLogin();

    const login = async () => {
        const body = {
            username: usuario.username, password: usuario.password
        };

        try {
            await mutate(body);

            if (isSuccess) {
                AsyncStorage.setItem('tokenParsed', JSON.stringify(data?.token));
                ToastAndroid.show(
                    'Logado com sucesso',
                    ToastAndroid.SHORT,
                );
            }
        } catch (error) {
            ToastAndroid.show(
                error.message || 'Erro desconhecido',
                ToastAndroid.SHORT,
            );
        }
    }

    const cadastro = async () => {
        navigation.navigate("NovoUsuario")
    }

    return (
        <ScrollView style={{
            padding: 20,
            paddingTop: 80,
            backgroundColor: "#cbfb74",
        }}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        marginBottom: 10
                    }}
                    source={imageLogo}
                />
            </View>
            <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 20, fontWeight: "900" }}>Login</Text>

            <View style={estilos.container}>
                <TextInput
                    placeholder="Email"
                    autoCapitalize="none"
                    value={usuario.username}
                    onChangeText={(e) => setUsuario((old) => ({ ...old, username: e }))}
                    style={estilos.entrada}
                />
                <TextInput
                    placeholder="Senha"
                    autoCapitalize="none"
                    secureTextEntry
                    value={usuario.password}
                    onChangeText={(e) => setUsuario((old) => ({ ...old, password: e }))}
                    style={estilos.entrada}
                />


                <TouchableOpacity onPress={() => login()} style={estilos.botao}>
                    <Text style={estilos.textoBotao}>
                        {isLoading ? "Entrando ..." : "Entrar"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => cadastro()} style={estilos.botaoCadastro}>
                    <Text >Não tenho cadastro</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}
