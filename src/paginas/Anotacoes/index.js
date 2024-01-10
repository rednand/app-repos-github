import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import estilos from "./estilos";
import { useIsFocused } from "@react-navigation/native";
import moment from "moment/moment";
import "moment/locale/pt-br";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { buscaAnotacoes, deletaAnotacao } from "../../service/reqs/anotacoes";

export default function Anotacoes({ route, navigation }) {
  const [repo, setRepo] = useState([]);
  const estaNaTela = useIsFocused();
  const [loading, setLoading] = useState(true);

  const carregaAnotacoes = async () => {
    try {
      setLoading(true);
      const resultado = await buscaAnotacoes();
      resultado.length > 0 ? setRepo(resultado) : null;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregaAnotacoes();
  }, [estaNaTela]);

  return (
    <View style={estilos.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("CadastroAnotacao")}
      >
        <Entypo name="circle-with-plus" size={24} color={'#212121'} style={{ marginTop: 20 }} />
      </TouchableOpacity>

      {loading ? (
        <View style={{ height: 390 }}>
          <ActivityIndicator
            color={"#212121"}
            size={40}
            style={{ margin: 40 }}
          />
        </View>
      ) : (
        <FlatList
          data={repo}
          style={{ width: "95%", marginTop: "5%" }}
          keyExtractor={(repo) => repo._id}
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                marginHorizontal: 10,
                marginVertical: 15,
                paddingHorizontal: 15,
                backgroundColor: "#Fff",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  marginBottom: 20,
                  marginTop: 20,
                }}
              >
                <Text style={estilos.repositorioData}>
                  Anotação:{" "}
                  <Text style={estilos.repositorioDataValor}>
                    {" "}
                    {item.anotacao}
                  </Text>
                </Text>
                <Text style={estilos.repositorioNome}>
                  Data:
                  <Text style={estilos.repositorioDataValor}>
                    {" "}
                    {item.data ? moment.utc(item.data).format("DD/MM/YYYY") : " -"}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  deletaAnotacao(item._id).then(() => carregaAnotacoes())
                }
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
