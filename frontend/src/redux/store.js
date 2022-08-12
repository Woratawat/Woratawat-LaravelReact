import { configureStore , combineReducers} from '@reduxjs/toolkit';
import {
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist';
import authReducer from './app/appReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({ auth: authReducer });

const persistConfig = {
  key: 'app',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: {auth:persistedReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)

 


