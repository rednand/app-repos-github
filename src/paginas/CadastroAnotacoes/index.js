import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import estilos from "./estilos";
import DatePicker from 'react-native-modern-datepicker';
import moment from "moment";
import { useCriaAnotacoes } from "../../service/reqs/anotacoes";

export default function CadastroAnotacao({ navigation }) {
  const [usuario, setUsuario] = useState({ anotacao: "" });
  const [data, setData] = useState("");

  const { mutate, isLoading, isSuccess } = useCriaAnotacoes();

  const adicionar = async () => {
    const body = {
      anotacao: usuario.anotacao, data: data
    };

    try {
      await mutate(body);
      if (isSuccess) {
        ToastAndroid.show(
          'Registro criado com sucesso',
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

  return (
    <ScrollView>
      <View style={estilos.container}>
        <TextInput
          placeholder="Digite sua anotação"
          autoCapitalize="none"
          multiline={true}
          numberOfLines={4}
          value={usuario.anotacao}
          onChangeText={(e) => setUsuario((old) => ({ ...old, anotacao: e }))}
          style={estilos.entrada}
        />
        <View style={{ width: "90%", margin: "10%" }}>
          <DatePicker
            style={estilos.entradaDate}
            selected={moment(new Date()).format("YYYY-MM-DD")}
            onSelectedChange={(date) => setData(date)}
          />
        </View>
        <TouchableOpacity onPress={() => adicionar()} style={estilos.botao}>
          <Text style={estilos.textoBotao}>{isLoading ? <ActivityIndicator color={"#212121"} /> : "Adicionar anotação"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
