import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Vitalsigns from "./components/Vitalsigns";
import Register from "./components/Register";

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Switch>
        <Route component={Register} path="/" exact={true} />
        <Route component={Vitalsigns} path="/vitalsigns" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
