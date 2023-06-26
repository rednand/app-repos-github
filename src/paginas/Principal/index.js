import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import estilos from "./estilos";
import { buscaUsuario } from "../../service/reqs/usuarios";

export default function Principal({ navigation }) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [usuario, setUsuario] = useState({});

  async function busca() {
    const resultado = await buscaUsuario(nomeUsuario);

    setNomeUsuario("");
    if (resultado) {
      setUsuario(resultado);
    } else {
      Alert.alert("Usuario nao encontrado");
      setUsuario({});
    }
  }

  return (
    <ScrollView>
      <View style={estilos.container}>
        {usuario?.login && (
          <>
            <View style={estilos.fundo} />
            <View style={estilos.imagemArea}>
              <Image
                source={{
                  uri: usuario.avatar_url,
                }}
                style={estilos.imagem}
              />
            </View>
            <Text style={estilos.textoNome}>{usuario.login}</Text>
            <Text style={estilos.textoEmail}>{usuario.email}</Text>
            <View style={estilos.seguidoresArea}>
              <View style={estilos.seguidores}>
                <Text style={estilos.seguidoresNumero}>
                  {usuario.following}
                </Text>
                <Text style={estilos.seguidoresTexto}>Seguidores</Text>
              </View>
              <View style={estilos.seguidores}>
                <Text style={estilos.seguidoresNumero}>
                  {usuario.followers}
                </Text>
                <Text style={estilos.seguidoresTexto}>Seguindo</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Repositorios", { nome: usuario.login })
              }
            >
              <Text style={estilos.repositorios}>Ver os repositórios</Text>
            </TouchableOpacity>
          </>
        )}
        <TextInput
          placeholder="Buscar usuário pelo nome"
          autoCapitalize="none"
          value={nomeUsuario}
          onChangeText={setNomeUsuario}
          style={estilos.entrada}
        />

        <TouchableOpacity onPress={busca} style={estilos.botao}>
          <Text style={estilos.textoBotao}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
