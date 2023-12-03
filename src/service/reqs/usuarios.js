import { Alert } from "react-native";
import { useQuery, useMutation, queryCache } from 'react-query';
import api from '../api';
import { useNavigation } from "@react-navigation/native";

export async function buscaUsuario() {
  try {
    const resultado = await api.get();

    return resultado.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

// export async function criaFinancas(body) {
//   console.log("🚀 ~ file: usuarios.js:15 ~ criaFinancas ~ body:", body)
//   try {
//     const resultado = await api.post('/informValor', body);
//     return resultado.data;
//   } catch (error) {
//     console.error("Erro em criaFinancas:", error.message, error.response?.data);
//     console.log("🚀 ~ file: usuarios.js:19 ~ criaFinancas ~ error:", error)
//     Alert.alert("Erro", error.message || "Erro desconhecido");
//     return error
//   }
// }

export async function deletaUsuario(id) {
  try {
    const resultado = await api.delete(`/deleteValor/${id}`);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return error
  }
}

const fetchFinancas = async () => {
  const resultado = await api.get('/suaRotaDeBusca');
  return resultado.data;
};

const criaFinancas = async (body) => {
  const resultado = await api.post('/informValor', body);
  return resultado.data;
};

const useFinancas = () => {
  return useQuery('financas', fetchFinancas);
};

const useCriaFinancas = () => {

  const navigation = useNavigation();

  return useMutation(criaFinancas, {
    onSuccess: () => {
      navigation.navigate("Home")
    },
  });
};

export { useFinancas, useCriaFinancas };