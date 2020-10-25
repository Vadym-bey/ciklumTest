import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { BrowserRouter as Router } from "react-router-dom";
import './index.scss';
import App from './App';

render(
  <Provider store={store}>
      <Router>
          <App />
      </Router>
  </Provider>,
  document.getElementById("root")
);
