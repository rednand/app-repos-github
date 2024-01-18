import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import estilos from "./estilos";
import { deletaGasto, useBuscaGastos } from "../../service/reqs/gastos";
import moment from "moment/moment";
import 'moment/locale/pt-br';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ContextToken } from "../../service/auth";

export default function Home({ route, navigation }) {
  const [repo, setRepo] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { tokenContext } = React.useContext(ContextToken);
  const { data: gastos, isLoading, refetch } = useBuscaGastos(tokenContext);

  useEffect(() => {
    if (tokenContext && !!gastos) {
      setRepo(gastos);
    }

  }, [tokenContext, gastos]);

  const formatoReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };


  const totalGastosInd1 = repo?.filter((item) => item.nome === "Renan").reduce((total, gasto) => total + gasto.valor, 0);
  const totalGastosInd2 = repo?.filter((item) => item.nome === "Samuel").reduce((total, gasto) => total + gasto.valor, 0);

  return (
    <View style={estilos.container}>
      <View style={{
        display: "flex",
        alignItems: "center",
        padding: 20,
        paddingTop: 5,
        backgroundColor: "#0F1511",
        borderBottomWidth: 2,
        justifyContent: "center",
      }}>
        <Text style={estilos.repositoriosTextoMes} >
          {moment().format("MMMM")}
        </Text>
        <View style={{ borderColor: "#212121", width: "100%", height: 1 }}></View>
        <Text style={estilos.repositoriosTexto}>
          {repo?.length === 1 ? repo?.length + " gasto incluído" : repo?.length + " gastos incluídos"}
        </Text>
        <View style={{ width: "100%", marginTop: 30, marginBottom: 40, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
          <View style={{
            borderColor: "#212121",
            backgroundColor: "#373B38",
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
            backgroundColor: "#373B38",
            borderWidth: 2,
            borderColor: "#212121",
            padding: 10,
            width: "45%",
            borderRadius: 20,
          }}>
            <Text style={estilos.repositoriosTexto2}>Samuel</Text>
            <Text style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#e3edc5",
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

      {isLoading ? <View
        style={{ height: 390 }}>
        <ActivityIndicator color={"#212121"} size={40} style={{ margin: 40 }} />
      </View> :
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#212121"]}
            />

          }
          data={repo}
          style={{ width: "90%", marginTop: "10%" }}
          keyExtractor={(repo) => repo._id}
          renderItem={({ item }) => (
            <View style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginHorizontal: 10,
              marginVertical: 15,
              paddingHorizontal: 15,
              backgroundColor: "#Fff",
              borderRadius: 20,
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
                onPress={() => deletaGasto(item._id).then(() => refetch())}>
                <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />}

    </View >
  );
}
