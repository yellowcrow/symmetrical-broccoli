import { useAppSelector } from '../store/hooks';
import { selectFilteredTodos, selectTodoCounts } from '../store/selectors';
import TodoItem from './TodoItem';

const TodoList = () => {
  const filteredTodos = useAppSelector(selectFilteredTodos);
  const { active, completed, total } = useAppSelector(selectTodoCounts);
  const todos = useAppSelector((state) => state.todos.todos);
  const filter = useAppSelector((state) => state.todos.filter);

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-xl text-gray-600 font-medium mb-2">No tasks yet</p>
        <p className="text-sm text-gray-500">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <span>
          {active} active • {completed} completed
        </span>
        <span className="font-medium">
          Total: {total} {total === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No {filter} tasks</p>
          <p className="text-sm mt-1">
            {filter === 'active' && 'All tasks are completed! 🎉'}
            {filter === 'completed' && 'No completed tasks yet'}
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredTodos.map((todo) => (
            <li key={todo.id}>
              <TodoItem todo={todo} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
