import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import Navbar from './components/universal/navbar';
import Homepage from "./components/homepage";
import Signin from "./components/auth/signin";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import { AUTHENTICATED } from "./actions";
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const user = localStorage.getItem("user");
if (user) {
  store.dispatch({ type: AUTHENTICATED });
}
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        {/* <Navbar /> */}
        <Route exact path="/" component={Signin} />
        <Route path="/signin" component={Signin} />
        <Route path="/homepage" component={Homepage} />
      </div>
    </Router>
  </Provider>,
  document.querySelector("#root")
);
