import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { errorLoggingMiddleware } from '@app/store/middlewares/errorLogging.middleware';
import rootReducer from '@app/store/slices';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  app: rootReducer.app,
  auth: rootReducer.auth,
  nightMode: rootReducer.nightMode,
  pwa: rootReducer.pwa,
  theme: rootReducer.theme,
  user: rootReducer.user,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(errorLoggingMiddleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
