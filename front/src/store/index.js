import { persistStore } from "redux-persist";
import persistReducers from './persistReducer'
import  createSagaMiddleware  from "redux-saga";
import  createStore  from "./createstore";
import rootreducer from './modules/rootreducer';
import rootSaga from "./modules/rootsaga";
const sagaMonitor=process.env.NODE_ENV==='development'
? console.tron.createSagaMonitor():null;
 const sagaMiddleware=createSagaMiddleware({sagaMonitor})
 const middlewares=[sagaMiddleware];
 const store=createStore(persistReducers(rootreducer),middlewares)
 const persistor=persistStore(store)
 sagaMiddleware.run(rootSaga)
 export {store, persistor};