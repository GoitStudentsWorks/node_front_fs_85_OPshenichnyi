import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { GlobalStyle } from "common/GlobalStyles";
import App from "components/App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "store";
import { persistor } from "store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/node_front_fs_85_OPshenichnyi">
          <GlobalStyle />
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
