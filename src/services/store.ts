import type { ConfigureStoreOptions } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import { api } from './api';
import { reducer as shopReducer } from './shop';

const appReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    shop: shopReducer,
});

const reducer = (state: any, action: any) => {
    return appReducer(state, action);
};

export const initStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) => {
    const store = configureStore({
        reducer: reducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(api.middleware),
        ...options,
    });
    // setupListeners(store.dispatch);

    return store;
};

export const store = initStore();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

// export const persistor = persistStore(store);

export default store;
