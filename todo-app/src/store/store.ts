import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import { loadState, saveState } from '../utils/localStorage';

// Загрузка состояния из localStorage
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: persistedState ? { todos: persistedState } : undefined,
});

// Подписка на изменения store для автосохранения
store.subscribe(() => {
  saveState(store.getState().todos);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
