import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F0EE",
    alignItems: "center",
    justifyContent: "center",
  },
  repositoriosTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 5,
  },
  repositoriosTextoMes: {
    fontSize: 21,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 10,
    textTransform: "capitalize",
  },
  repositoriosTexto2: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    display: "flex",
    flexDirection: "column"
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  repositorio: {
    width: "100%",
    minWidth: "100%",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  repositorioNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
  },
  repositorioData: {
    fontSize: 15,
    color: "#444",
    textTransform: "capitalize",
  },
  repositorioDataDescricao: {
    fontSize: 14,
    color: "#6a6161",
  },
  repositorioDataValor: {
    fontSize: 14,
    marginLeft: 5,
    color: "#444",
  },
  botao: {
    backgroundColor: "#cbfb74",
    borderColor: "#212121",
    borderWidth: 5,
    marginVertical: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: "90%",
  },
});

export default estilos;
