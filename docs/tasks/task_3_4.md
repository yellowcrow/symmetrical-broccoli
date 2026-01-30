# Task 3.4: Создание компонента AddTodoForm (форма добавления)

**Этап:** 3 - Базовые компоненты (заглушки)  
**Приоритет:** Критический  
**Юзер-кейсы:** UC-2 (Добавление новой задачи)  
**Зависимости:** Task 3.1

---

## Цель
Создать компонент формы для добавления новых задач (пока без функциональности).

---

## Изменения по файлам

### Создать `src/components/AddTodoForm.tsx`
```tsx
import { useState } from 'react';

const AddTodoForm = () => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Будет реализовано в Task 4.1
    console.log('Add todo:', text);
    
    // Очистка поля (уже работает)
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
```

### Обновить `src/App.tsx`
Заменить placeholder на реальный компонент:

```tsx
import { useAppSelector } from './store/hooks';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Todo List
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently
          </p>
        </header>

        <main className="bg-white rounded-lg shadow-lg p-6">
          <AddTodoForm />
          <TodoList />
        </main>

        <footer className="text-center mt-8 text-gray-600 text-sm">
          Built with React, TypeScript, Redux Toolkit & Tailwind CSS
        </footer>
      </div>
    </div>
  );
}

export default App;
```

---

## Интеграция
После выполнения этой задачи:
- Форма отображается в приложении
- Поле ввода работает (controlled component)
- Submit пока логирует в консоль
- Поле очищается после submit

---

## Тест-кейсы
1. Запустить приложение
2. Ввести текст в поле "What needs to be done?"
3. Нажать Enter или кнопку "Add"
4. Проверить консоль - должно быть логирование
5. Убедиться, что поле очистилось
6. Попробовать отправить пустую форму

---

## Критерии приёмки
- ✅ Файл `src/components/AddTodoForm.tsx` создан
- ✅ Форма с input и button отображается
- ✅ Input работает как controlled component
- ✅ Submit обрабатывается (пока логирует)
- ✅ Поле очищается после submit
- ✅ Компонент интегрирован в App.tsx
- ✅ Стили Tailwind применены
