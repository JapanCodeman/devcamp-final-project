// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./components/app";

// import "./style/main.scss";

// function main() {
//   ReactDOM.render(
//         <App/>,
//     document.querySelector(".app-wrapper")
//   );
// }

// document.addEventListener("DOMContentLoaded", main);


   
// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter } from "react-router";
// import App from "./components/app";


// import "./style/main.scss";

// function main() {
//   ReactDOM.render(
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>,
//     document.querySelector(".app-wrapper")
//   );
// }

// document.addEventListener("DOMContentLoaded", main);

// import React from 'react';
// import ReactDOM from 'react-dom';
// import {Router} from "react-router";
// import App from './components/app';
// import history from "./history";

// ReactDOM.render(
//   <Router history={history}>
//     <App />
//   </Router>,
//   document.getElementById('root')
// );

// document.addEventListener("DOMContentLoaded", main);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware()(createStore);

import "./style/main.scss";

function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);