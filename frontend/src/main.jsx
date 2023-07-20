import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import * as ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import React from "react"
const colors = {
  brand: {
    900: "#3f2f80",
    800: "#4a32a1",
    700: "#5b3ac8",
    600: "#6949e2",
    500: "#7a68ef",
    400: "#8a83f6",
    300: "#a6a8fb",
    200: "#c8cbfd",
  },
}

const theme = extendTheme({ colors })

const rootElement = document.getElementById("root")
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
)
