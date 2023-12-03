import { Alert } from "react-native";
import api from "../api";

export async function buscaUsuario() {
  try {
    const resultado = await api.get();

    return resultado.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function criaFinancas(body) {
  console.log("🚀 ~ file: usuarios.js:15 ~ criaFinancas ~ body:", body)
  try {
    const resultado = await api.post('/informValor', body);
    return resultado.data;
  } catch (error) {
    console.log("🚀 ~ file: usuarios.js:19 ~ criaFinancas ~ error:", error)
    Alert.alert(error)
    return error
  }
}

export async function deletaUsuario(id) {
  try {
    const resultado = await api.delete(`/deleteValor/${id}`, id);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return error
  }
}
