import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import estilos from "./estilos";
import { useIsFocused } from "@react-navigation/native";
import { buscaUsuario, deletaUsuario } from "../../service/reqs/usuarios";
import moment from "moment/moment";
import 'moment/locale/pt-br';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Repositorios({ route, navigation }) {
  const [repo, setRepo] = useState([]);
  const estaNaTela = useIsFocused();

  const carregarRepositorios = async () => {
    const resultado = await buscaUsuario();
    setRepo(resultado);
  };

  useEffect(() => {
    carregarRepositorios();
  }, [estaNaTela]);

  const formatoReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });


  const totalGastosInd1 = repo.filter((item) => item.nome === "Renan").reduce((total, gasto) => total + gasto.valor, 0);
  const totalGastosInd2 = repo.filter((item) => item.nome === "Samuel").reduce((total, gasto) => total + gasto.valor, 0);

  return (
    <View style={estilos.container}>
      <View style={{
        display: "flex",
        alignItems: "center",
        padding: 20, backgroundColor: "#3b4b54",
        justifyContent: "center",
      }}>
        <Text style={estilos.repositoriosTextoMes} >
          {moment().format("MMMM")}
        </Text>
        <View style={{ borderColor: "#fff", width: "100%", height: 1 }}></View>
        <Text style={estilos.repositoriosTexto}>
          {repo.length} gastos incluídos
        </Text>
        <View style={{ width: "100%", marginTop: 30, marginBottom: 20, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={{
            borderColor: "#f4f4f4",
            backgroundColor: "#3b4b54",
            borderWidth: 2,
            padding: 10,
            width: "45%",
            borderRadius: 20,

          }}>
            <Text style={estilos.repositoriosTexto2}>Renan</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#c9b0d7",
            }}>{formatoReal.format(totalGastosInd1)}
            </Text>
          </View>
          <View style={{
            backgroundColor: "#3b4b54",
            borderWidth: 2, borderColor: "#f4f4f4",
            padding: 10, width: "45%",
            borderRadius: 20,
          }}>
            <Text style={estilos.repositoriosTexto2}>Samuel</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#a8cadd",
            }}>{formatoReal.format(totalGastosInd2)}
            </Text>
          </View>
        </View>
      </View>


      <TouchableOpacity
        style={estilos.botao}
        onPress={() =>
          navigation.navigate("Principal")
        }
      >
        <Text style={estilos.textoBotao}>Adicionar novo gasto</Text>
      </TouchableOpacity>

      <FlatList
        data={repo}
        style={{ width: "90%" }}
        keyExtractor={(repo) => repo._id}
        renderItem={({ item }) => (
          <View style={{
            display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", borderBottomColor: '#212121',
            borderBottomWidth: 1,
          }}>
            <View style={{
              marginBottom: 20,
              marginTop: 20,
            }}>
              <Text
                style={estilos.repositorioNome}

              >
                Data:
                <Text style={estilos.repositorioDataValor}>
                  {" "}{moment.utc(item.data).format("DD/MM/YYYY")}
                </Text>
              </Text>
              <Text style={estilos.repositorioData}>
                Valor:
                <Text style={item.nome == "Renan" ? estilos.repositorioDataValorInd1 : estilos.repositorioDataValorInd2}>
                  {" "}{formatoReal.format(item.valor)}
                </Text>
              </Text>
              <Text style={estilos.repositorioData}>
                Gasto: <Text style={estilos.repositorioDataValor}>
                  {" "}{item.local}
                </Text>
              </Text>
              <Text style={estilos.repositorioData}>
                Quem deve:
                <Text style={estilos.repositorioDataValor}>
                  {" "}{item.nome}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => deletaUsuario(item._id).then(() => carregarRepositorios())}>
              <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
