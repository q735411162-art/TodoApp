import { v4 as uuidv4 } from 'uuid';
import { Todo, Category, Statistics } from '../types';
import { storageService } from './storageService';

class TodoService {
  async createTodo(title: string, categoryId: string, priority: 'low' | 'medium' | 'high' = 'medium'): Promise<Todo> {
    const todo: Todo = {
      id: uuidv4(),
      title,
      description: '',
      completed: false,
      priority,
      categoryId,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false,
    };

    await storageService.addTodo(todo);
    return todo;
  }

  async updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
    const todo = await storageService.getTodo(id);
    if (!todo) throw new Error('Todo not found');

    const updated: Todo = {
      ...todo,
      ...updates,
      updatedAt: new Date(),
      id: todo.id,
      createdAt: todo.createdAt,
    };

    await storageService.updateTodo(updated);
    return updated;
  }

  async deleteTodo(id: string): Promise<void> {
    await storageService.deleteTodo(id);
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    return await storageService.getTodo(id);
  }

  async getAllTodos(): Promise<Todo[]> {
    return await storageService.getAllTodos();
  }

  async getStatistics(): Promise<Statistics> {
    const todos = await this.getAllTodos();
    const completedTodos = todos.filter(t => t.completed);

    const byCategory: Record<string, number> = {};
    const byPriority: Record<string, number> = { low: 0, medium: 0, high: 0 };

    todos.forEach(todo => {
      byCategory[todo.categoryId] = (byCategory[todo.categoryId] || 0) + 1;
      byPriority[todo.priority]++;
    });

    return {
      totalTodos: todos.length,
      completedTodos: completedTodos.length,
      completionRate: todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0,
      byCategory,
      byPriority,
      overdueTodos: 0,
      dueTodayTodos: 0,
    };
  }

  async createCategory(name: string, color: string, icon: string): Promise<Category> {
    const category: Category = {
      id: uuidv4(),
      name,
      color,
      icon,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await storageService.addCategory(category);
    return category;
  }

  async getAllCategories(): Promise<Category[]> {
    return await storageService.getAllCategories();
  }
}

export const todoService = new TodoService();
