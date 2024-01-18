import { useQuery, useMutation, queryCache } from 'react-query';
import api from '../api';
import { useNavigation } from "@react-navigation/native";

export async function buscaGastos(tokenParsed) {
  console.log("🚀 ~ buscaGastos ~ tokenParsed:", tokenParsed)
  try {
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

export function useBuscaGastos(tokenParsed) {
  const fetchData = async () => {
    const resultado = await api.get("listall", {
      headers: {
        Authorization: `Bearer ${tokenParsed}`,
      },
    });

    return resultado.data;
  };

  const { data, isLoading, refetch } = useQuery('gastos', fetchData, {
    refetchInterval: 2000, 
  });

  return { data, isLoading, refetch };
}

export async function deletaGasto(id) {
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

const useCadastro = () => {

  const navigation = useNavigation();

  return useMutation(cadastro, {
    onSuccess: () => {
      navigation.navigate("Login")
    },
  });
};

export { useCadastro, useFinancas, useCriaFinancas };