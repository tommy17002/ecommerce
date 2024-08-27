// FE
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";

import { AuthProvider } from "./contexts/AuthContext";
import store from "./redux/store.js"
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <AuthProvider>
      <Provider store={store}>
      <App />
      </Provider>
    </AuthProvider>
  </NextUIProvider>
);
