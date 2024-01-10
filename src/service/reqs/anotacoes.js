import { useMutation, queryCache } from 'react-query';
import api from '../api';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const buscaAnotacoes = async () => {
  try {
    const token = await AsyncStorage.getItem('tokenParsed');
    const tokenParsed = JSON.parse(token);
    const resultado = await api.get("listanotacoes", {
      headers: {
        Authorization: `Bearer ${tokenParsed}`,
      }
    },);

    return resultado.data;
  } catch (error) {
    return {};
  }
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

export { useCriaAnotacoes, buscaAnotacoes, deletaAnotacao };