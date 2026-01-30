import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import TodoFilter from './components/TodoFilter';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            Todo List
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your tasks efficiently ✨
          </p>
        </header>

        {/* Main Card */}
        <main className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <AddTodoForm />
          
          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>
          
          <TodoFilter />
          <TodoList />
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-500 text-xs sm:text-sm">
          <p>Built with React, TypeScript, Redux Toolkit & Tailwind CSS</p>
          <p className="mt-1">💙 Made with love</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
