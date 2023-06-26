import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import estilos from "./estilos";
import { criarRepositoriosDoUsuario } from "../../service/reqs/repositorios";

export default function CriarRepositorio({ route, navigation }) {
  console.log("🚀 ~ file: index.js:7 ~ CriarRepositorio ~ route:", route);
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");

  async function criarRepositorio() {
    console.log(
      "🚀 ~ file: index.js:12 ~ criarRepositorio ~ route.params.id:",
      route.params.id
    );

    const resultado = await criarRepositoriosDoUsuario(
      route.params.id,
      nome,
      data
    );

    if (resultado === "sucesso") {
      Alert.alert("Repositorio atualizado!");
      navigation.goBack();
    } else {
      Alert.alert("Erro");
    }
  }

  return (
    <View style={estilos.container}>
      <TextInput
        placeholder="Nome do repositório"
        autoCapitalize="none"
        style={estilos.entrada}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Data de criação"
        autoCapitalize="none"
        style={estilos.entrada}
        value={data}
        onChangeText={setData}
      />
      <TouchableOpacity
        style={estilos.botao}
        onPress={() => criarRepositorio()}
      >
        <Text style={estilos.textoBotao}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}
