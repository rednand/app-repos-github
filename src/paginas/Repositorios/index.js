import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import estilos from "./estilos";
import { pegarRepositoriosDoUsuario } from "../../service/reqs/repositorios";
import { useIsFocused } from "@react-navigation/native";

export default function Repositorios({ route, navigation }) {
  console.log("🚀 ~ file: index.js:8 ~ Repositorios ~ route:", route);
  const [repo, setRepo] = useState([]);
  console.log("🚀 ~ file: index.js:10 ~ Repositorios ~ repo:", repo);
  const estaNaTela = useIsFocused();

  useEffect(async () => {
    const resultado = await pegarRepositoriosDoUsuario(route.params.nome);
    setRepo(resultado);
  }, [estaNaTela]);

  return (
    <View style={estilos.container}>
      <Text style={estilos.repositoriosTexto}>
        {repo.length} repositórios criados
      </Text>
      <TouchableOpacity
        style={estilos.botao}
        onPress={() =>
          navigation.navigate("CriarRepositorio", { id: route.params.id })
        }
      >
        <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
      </TouchableOpacity>

      <FlatList
        data={repo}
        style={{ widt: "100%" }}
        keyExtractor={(repo) => repo.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={estilos.repositorio}>
            <Text
              style={estilos.repositorioNome}
              onPress={() => navigation.navigate("InfoRepositorio", { item })}
            >
              {item.name}
            </Text>
            <Text style={estilos.repositorioDataDescricao}>
              {item.description}
            </Text>
            <Text style={estilos.repositorioData}>
              Tópicos:{" "}
              {item.topics.map((item) => (
                <Text
                  style={{
                    backgroundColor: "#eac0df",
                    paddingHorizontal: 15,
                    borderRadius: 10,
                  }}
                >
                  {" "}
                  {item}{" "}
                </Text>
              ))}
            </Text>

            <Text style={estilos.repositorioData}>
              Criado em: {item.created_at}
            </Text>
            <Text style={estilos.repositorioData}>
              Atualizado em: {item.pushed_at}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
