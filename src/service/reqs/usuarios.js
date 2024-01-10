import { useQuery, useMutation, queryCache } from 'react-query';
import api from '../api';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function buscaUsuario() {
  try {
    const token = await AsyncStorage.getItem('tokenParsed');
    const tokenParsed = JSON.parse(token);
    const resultado = await api.get("listall", {
      headers: {
        Authorization: `Bearer ${tokenParsed}`,
      }
    },);

    return resultado.data;
  } catch (error) {
    return {};
  }
}


export async function deletaUsuario(id) {
  try {
    const resultado = await api.delete(`/listall/deleteValor/${id}`);
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
  const resultado = await api.post('/listall/informValor', body);
  return resultado.data;
};

const login = async (body) => {
  const resultado = await api.post('login', body);
  return resultado.data
};

const cadastro = async (body) => {
  const resultado = await api.post('register', body);
  return resultado.data
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

const useLogin = () => {

  const navigation = useNavigation();

  return useMutation(login, {
    onSuccess: () => {
      navigation.navigate("Home")
    },
  });
};

const useCadastro = () => {

  const navigation = useNavigation();

  return useMutation(cadastro, {
    onSuccess: () => {
      navigation.navigate("Login")
    },
  });
};

export { useLogin, useCadastro, useFinancas, useCriaFinancas };