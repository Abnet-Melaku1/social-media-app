import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import * as ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import React from "react"
const colors = {
  brand: {
    900: "#d8572a",
    800: "#d8572a",
    700: "#d8572a",
    600: "#d8572a",
    500: "#d8572a",
    400: "#d8572a",
    300: "#d8572a",
    200: "#d8572a",
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
