import "./App.css";
import {useEffect} from 'react'
import { Navigationbar } from "./components/Navigationbar";
import { Login } from "./components/Login";
import { Area1 } from "./components/Area1";
import { Signup } from "./components/Signup";
import { Warehouse } from "./components/Warehouse";
import { Cake } from "./components/CakeContainer";
import axios from 'axios'
import {useDispatch} from "react-redux"

import { delAuth, initAuth } from "./redux/actions";

import { Provider } from "react-redux";

import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  useEffect(() => {
    document.title = "Sayantan Mishra | Software Developer"
 }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navigationbar />
        <Switch>
          <div className="main-class">
            <Route exact path="/">
              <Area1 />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/warehouse">
              <Warehouse />
            </Route>
            <Route exact path="/cake">
              <Cake />
            </Route>
          </div>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
