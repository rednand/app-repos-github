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
import { useCadastro } from "../../service/reqs/gastos";
import { useNavigation } from "@react-navigation/native";
import imageLogo from ">/../../assets/semente-do-cafe.png"

export default function NovoUsuario() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({ username: "", email: "", password: "" })
  const { data, mutate, isLoading, isSuccess } = useCadastro();

  const cadastro = async () => {
    const body = {
      username: usuario.username, email: usuario.email, password: usuario.password
    };

    try {
      await mutate(body);

      if (isSuccess) {
        ToastAndroid.show(
          'Cadastro com sucesso',
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

  const login = async () => {
    navigation.navigate("Login")
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

      <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 20, fontWeight: "900" }}>Cadastro</Text>
      <View style={estilos.container}>
        <TextInput
          placeholder="Nome"
          autoCapitalize="none"
          value={usuario.username}
          onChangeText={(e) => setUsuario((old) => ({ ...old, username: e }))}
          style={estilos.entrada}
        />
        <TextInput
          placeholder="E-mail"
          autoCapitalize="none"
          value={usuario.email}
          onChangeText={(e) => setUsuario((old) => ({ ...old, email: e }))}
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

        <TouchableOpacity onPress={() => cadastro()} style={estilos.botao}>
          <Text style={estilos.textoBotao}>{!isLoading ? "Cadastrar" : "Carregando ..."}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => login()} style={estilos.botaoCadastro}>
          <Text >Já possuo cadastro</Text>
        </TouchableOpacity>
      </View>
    </ScrollView >
  );
}
