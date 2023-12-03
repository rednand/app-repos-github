import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  repositoriosTexto: {
    fontSize: 21,
    fontWeight: "600",
    color: "#45565F",
    marginTop: 20,
  },
  repositoriosTexto2: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    display: "flex",
    flexDirection: "column"
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  repositorio: {
    width: "100%",
    minWidth: "100%",

    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  repositorioNome: {
    fontSize: 16,
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
    textTransform: "capitalize",
    color: "#444",
    fontWeight: "bold",
  },
  repositorioDataValorInd1: {
    fontSize: 14,
    marginLeft: 5,
    textTransform: "capitalize",
    color: "#8e25cb",
    fontWeight: "bold",
  },
  repositorioDataValorInd2: {
    fontSize: 14,
    marginLeft: 5,
    textTransform: "capitalize",
    color: "#1e93d2",
    fontWeight: "bold",
  },
  botao: {
    backgroundColor: "#3b4b54",
    marginTop: 20,
    marginBottom: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    width: "90%",
  },
  textoBotao: {
    fontSize: 16,
    color: "#FFF",
  },
});

export default estilos;
