import { useMutation, useQuery } from 'react-query';
import api from '../api';
import { useNavigation } from "@react-navigation/native";



export function useBuscaAnotacoes(tokenParsed) {
  const fetchData = async () => {
    const resultado = await api.get("listanotacoes", {
      headers: {
        Authorization: `Bearer ${tokenParsed}`,
      },
    });

    return resultado.data;
  };

  const { data, isLoading, refetch } = useQuery('listanotacoes', fetchData, {
    refetchInterval: 3000,
  });

  return { data, isLoading, refetch };
}

const deletaAnotacao = async (id) => {
  try {
    const resultado = await api.delete(`/listall/deleteanotacao/${id}`);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return error
  }
}

const criaAnotacao = async (body) => {
  const resultado = await api.post('/listall/informAnotacao', body);
  return resultado.data;
};

const useCriaAnotacoes = () => {

  const navigation = useNavigation();

  return useMutation(criaAnotacao, {
    onSuccess: () => {
      navigation.navigate("Anotacoes")
    },
  });
};

export { useCriaAnotacoes, deletaAnotacao };