import { configureStore, ThunkAction, PayloadAction } from '@reduxjs/toolkit';
import boardsListSliceReducer from '@features/desks/slice';
import { getFirebase } from 'react-redux-firebase';

export const store = configureStore({
  reducer: {
    boardsListSlice: boardsListSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          getFirebase,
        },
      },
      serializableCheck: false, // Отключаем проверку сериализации
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

//RootState помогает объединить все состояния срезов в одну общую структуру и обеспечивает типизацию для доступа к этим состояниям внутри компонентов
export type RootState = ReturnType<typeof store.getState>;

export type AppAction<R> = ThunkAction<R, RootState, unknown, PayloadAction>;

export type Dispatch = typeof store.dispatch;
