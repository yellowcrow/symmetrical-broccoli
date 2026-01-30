import type { TodoState } from '../types/todo.types';
import { validateTodoState } from './validation';

const STORAGE_KEY = 'todoApp_state';

export const loadState = (): TodoState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    
    const parsed = JSON.parse(serializedState);
    return validateTodoState(parsed);
  } catch {
    // Если парсинг или валидация не удались, возвращаем undefined
    return undefined;
  }
};

export const saveState = (state: TodoState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch {
    // Ignore save errors (e.g., quota exceeded)
  }
};
