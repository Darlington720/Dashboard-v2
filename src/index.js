import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import editCustomerDetails from "./redux/reducers/Reducers";
import Select from "./components/Select";

import AdminLayout from "layouts/Admin.js";

const store = createStore(editCustomerDetails);

ReactDOM.render(
  <Provider store={store}>
    {/* <Select /> */}
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect to="/admin/dashboard" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
