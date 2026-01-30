import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';
import type { Todo } from '../types/todo.types';

// Базовые селекторы
const selectTodos = (state: RootState) => state.todos.todos;
const selectFilter = (state: RootState) => state.todos.filter;

// Мемоизированный селектор для фильтрованных задач
export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter): Todo[] => {
    return todos.filter(todo => {
      if (filter === 'active') return !todo.completed;
      if (filter === 'completed') return todo.completed;
      return true;
    });
  }
);

// Мемоизированный селектор для подсчёта задач
export const selectTodoCounts = createSelector(
  [selectTodos],
  (todos) => {
    const active = todos.filter(t => !t.completed).length;
    const completed = todos.filter(t => t.completed).length;
    const total = todos.length;
    
    return {
      active,
      completed,
      total,
    };
  }
);

// Функция для создания селектора количества задач по конкретному фильтру
export const makeSelectFilterCount = (filterValue: 'all' | 'active' | 'completed') => 
  createSelector(
    [selectTodos],
    (todos) => {
      if (filterValue === 'all') return todos.length;
      if (filterValue === 'active') return todos.filter(t => !t.completed).length;
      if (filterValue === 'completed') return todos.filter(t => t.completed).length;
      return 0;
    }
  );
