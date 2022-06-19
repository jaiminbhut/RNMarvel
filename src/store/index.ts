import { rootReducer } from '@/reducers';
import rootSaga from '@/sagas';
import storage from '@/storage';
import immutablePersistenceTransform from '@/utils/immutablePersistenceTransform';
import { applyMiddleware, compose, legacy_createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

// @ts-ignore
const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
const middleWare = [sagaMiddleware];

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['nav', 'navigation'],
  transforms: [immutablePersistenceTransform],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(...middleWare);

let enhancers;

if (__DEV__) {
  // @ts-ignore
  enhancers = composeEnhancers(middleware, console.tron.createEnhancer());
} else {
  enhancers = compose(middleware);
}

const store = legacy_createStore(persistedReducer, enhancers);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };
