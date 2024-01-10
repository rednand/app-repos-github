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
import { Picker } from '@react-native-picker/picker';
import estilos from "./estilos";
import { criaFinancas, useCriaFinancas } from "../../service/reqs/gastos";
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import moment from "moment";

export default function Principal({ navigation }) {
  const [usuario, setUsuario] = useState({ valor: null, local: "", nome: "Renan" });
  const [data, setData] = useState("");

  const { mutate, isLoading, isSuccess } = useCriaFinancas();

  const adicionar = async () => {
    const body = {
      nome: usuario.nome, local: usuario.local, valor: usuario.valor, data: data
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
          placeholder="Valor"
          autoCapitalize="none"
          value={usuario.valor}
          onChangeText={(e) => setUsuario((old) => ({ ...old, valor: e }))}
          style={estilos.entrada}
        />
        <TextInput
          placeholder="Local"
          autoCapitalize="none"
          value={usuario.local}
          onChangeText={(e) => setUsuario((old) => ({ ...old, local: e }))}
          style={estilos.entrada}
        />
        <Picker
          style={estilos.entrada}
          selectedValue={usuario.nome}
          onValueChange={(itemValue, itemIndex) =>
            setUsuario((old) => ({ ...old, nome: itemValue }))
          }>
          <Picker.Item label="Renan" value="Renan" />
          <Picker.Item label="Samuel" value="Samuel" />
        </Picker>
        <View style={{ width: "90%", margin: "10%" }}>
          <DatePicker
            style={estilos.entradaDate}
            selected={moment(new Date()).format("YYYY-MM-DD")}
            onSelectedChange={(date) => setData(date)}
          />
        </View>
        <TouchableOpacity onPress={() => adicionar()} style={estilos.botao}>
          <Text style={estilos.textoBotao}>{isLoading ? <ActivityIndicator color={"#212121"} /> : "Adicionar"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
