import { useQuery, useMutation, queryCache } from "react-query";
import api from "../api";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = async (body) => {
  const resultado = await api.post("login", body);
  return resultado.data;
};

const useLogin = () => {
  const navigation = useNavigation();

  return useMutation(login, {
    onSuccess: () => {
      navigation.navigate("Home");
    },
  });
};

export { useLogin };
