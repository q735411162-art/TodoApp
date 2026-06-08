import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, setCategories, setLoading } from './store/todoSlice';
import { RootState, AppDispatch } from './store';
import { todoService } from './services/todoService';
import { storageService } from './services/storageService';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        dispatch(setLoading(true));
        
        await storageService.init();
        
        const [todosData, categoriesData] = await Promise.all([
          todoService.getAllTodos(),
          todoService.getAllCategories(),
        ]);
        
        dispatch(setTodos(todosData));
        dispatch(setCategories(categoriesData));
        
        dispatch(setLoading(false));
      } catch (error) {
        console.error('Failed to initialize app:', error);
        dispatch(setLoading(false));
      }
    };

    initializeApp();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">📝 TodoApp</h1>
          <p className="text-gray-600 mt-1">Smart task management with local storage</p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Tasks</h2>
              <div className="space-y-3">
                {todos.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">No tasks yet. Create one to get started!</p>
                ) : (
                  todos.map(todo => (
                    <div
                      key={todo.id}
                      className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        className="mt-1 w-4 h-4 text-indigo-600 rounded"
                        readOnly
                      />
                      <div className="ml-3 flex-1">
                        <p className={`font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {todo.title}
                        </p>
                        {todo.description && (
                          <p className="text-sm text-gray-600 mt-1">{todo.description}</p>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                        todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {todo.priority}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-blue-600">{todos.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600">{todos.filter(t => t.completed).length}</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Active</p>
                <p className="text-3xl font-bold text-red-600">{todos.filter(t => !t.completed).length}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
