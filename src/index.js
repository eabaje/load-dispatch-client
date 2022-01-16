import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";
import { StateMachineProvider, createStore } from "little-state-machine";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

createStore({
  companyUser: {
    CompanyName: "",
    ContactEmail: "",
    ContactPhone: "",
    CompanyAddress: "",
    Country: "",
    Region: "",
    CompanyType: "",
    Specilaization: "",
    RoleType: "",
    FullName: "",
    Address: "",
    Email: "",
    Phone: "",
    Website: "",
    PaymentMethod: "",
  },
});
ReactDOM.render(
  <React.StrictMode>
    <StateMachineProvider>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </StateMachineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
