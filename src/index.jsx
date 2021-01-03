import React from "react";
import ReactDOM from "react-dom";
import './css/index.css';
import App from "./App";

import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import rootReducer, { rootSaga } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension'; 
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware(); 

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
// console.log(store.getState())


sagaMiddleware.run(rootSaga); // 루트 사가를 실행해줍니다.
// 주의: 스토어 생성이 된 다음에 위 코드를 실행해야합니다.

ReactDOM.render(
  <Provider store={store}>
    <App></App>
  </Provider >,
  document.getElementById("root"));
