import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(

  <Provider store={store}>

    <BrowserRouter>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            background: "#75232B",
            color: "#fff",
            borderRadius: "12px",
            padding: "14px 18px",
          },
        }}
      />

      <App />

    </BrowserRouter>

  </Provider>
);