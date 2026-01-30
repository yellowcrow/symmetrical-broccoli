import { z } from 'zod';
import type { TodoState } from '../types/todo.types';

// Схема валидации для Todo
const todoSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  completed: z.boolean(),
  createdAt: z.number().positive(),
});

// Схема валидации для TodoFilter
const todoFilterSchema = z.enum(['all', 'active', 'completed']);

// Схема валидации для TodoState
export const todoStateSchema = z.object({
  todos: z.array(todoSchema),
  filter: todoFilterSchema,
});

/**
 * Валидирует данные из localStorage
 * @param data - Данные для валидации
 * @returns Валидированный TodoState или undefined при ошибке
 */
export function validateTodoState(data: unknown): TodoState | undefined {
  try {
    return todoStateSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.warn('Invalid todo state structure:', error.issues);
    }
    return undefined;
  }
}
