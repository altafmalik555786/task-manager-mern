// import { createStore, compose, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// import reducers from "../reducers";

// const store = createStore(
//   reducers,
//   {},
//   composeWithDevTools(applyMiddleware(thunk))
// );
// export default store;

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "../reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
  persistedReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);
export default store;
