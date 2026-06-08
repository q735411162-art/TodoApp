import { Todo, Category, AppSettings } from '../types';

const DB_NAME = 'TodoAppDB';
const TODOS_STORE = 'todos';
const CATEGORIES_STORE = 'categories';
const SETTINGS_KEY = 'appSettings';
const TRASH_STORE = 'trash';

class StorageService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(TODOS_STORE)) {
          const todoStore = db.createObjectStore(TODOS_STORE, { keyPath: 'id' });
          todoStore.createIndex('categoryId', 'categoryId', { unique: false });
          todoStore.createIndex('dueDate', 'dueDate', { unique: false });
          todoStore.createIndex('priority', 'priority', { unique: false });
          todoStore.createIndex('completed', 'completed', { unique: false });
          todoStore.createIndex('createdAt', 'createdAt', { unique: false });
        }

        if (!db.objectStoreNames.contains(CATEGORIES_STORE)) {
          db.createObjectStore(CATEGORIES_STORE, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(TRASH_STORE)) {
          db.createObjectStore(TRASH_STORE, { keyPath: 'id' });
        }
      };
    });
  }

  async addTodo(todo: Todo): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TODOS_STORE], 'readwrite');
      const store = transaction.objectStore(TODOS_STORE);
      const request = store.add({
        ...todo,
        createdAt: todo.createdAt.getTime(),
        updatedAt: todo.updatedAt.getTime(),
        dueDate: todo.dueDate ? todo.dueDate.getTime() : null,
        completedAt: todo.completedAt ? todo.completedAt.getTime() : null,
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async updateTodo(todo: Todo): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TODOS_STORE], 'readwrite');
      const store = transaction.objectStore(TODOS_STORE);
      const request = store.put({
        ...todo,
        createdAt: todo.createdAt.getTime(),
        updatedAt: todo.updatedAt.getTime(),
        dueDate: todo.dueDate ? todo.dueDate.getTime() : null,
        completedAt: todo.completedAt ? todo.completedAt.getTime() : null,
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async deleteTodo(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const todo = await this.getTodo(id);
    if (todo) {
      await this.addToTrash(todo);
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TODOS_STORE], 'readwrite');
      const store = transaction.objectStore(TODOS_STORE);
      const request = store.delete(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TODOS_STORE], 'readonly');
      const store = transaction.objectStore(TODOS_STORE);
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const data = request.result;
        if (data) {
          resolve(this.parseTodo(data));
        } else {
          resolve(undefined);
        }
      };
    });
  }

  async getAllTodos(): Promise<Todo[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TODOS_STORE], 'readonly');
      const store = transaction.objectStore(TODOS_STORE);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const todos = request.result.map(data => this.parseTodo(data));
        resolve(todos);
      };
    });
  }

  async addCategory(category: Category): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CATEGORIES_STORE], 'readwrite');
      const store = transaction.objectStore(CATEGORIES_STORE);
      const request = store.add({
        ...category,
        createdAt: category.createdAt.getTime(),
        updatedAt: category.updatedAt.getTime(),
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllCategories(): Promise<Category[]> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([CATEGORIES_STORE], 'readonly');
      const store = transaction.objectStore(CATEGORIES_STORE);
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const categories = request.result.map(data => ({
          ...data,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        } as Category));
        resolve(categories);
      };
    });
  }

  async addToTrash(todo: Todo): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([TRASH_STORE], 'readwrite');
      const store = transaction.objectStore(TRASH_STORE);
      const request = store.add({
        ...todo,
        createdAt: todo.createdAt.getTime(),
        updatedAt: todo.updatedAt.getTime(),
        dueDate: todo.dueDate ? todo.dueDate.getTime() : null,
        deletedAt: new Date().getTime(),
      });

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getSettings(): Promise<AppSettings> {
    const settings = localStorage.getItem(SETTINGS_KEY);
    return settings ? JSON.parse(settings) : this.getDefaultSettings();
  }

  private getDefaultSettings(): AppSettings {
    return {
      theme: 'auto',
      language: 'en',
      notifications: true,
      reminderTime: 15,
      sortBy: 'dueDate',
      filterBy: 'all',
      categoriesView: 'list',
    };
  }

  private parseTodo(data: any): Todo {
    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      completedAt: data.completedAt ? new Date(data.completedAt) : null,
    } as Todo;
  }
}

export const storageService = new StorageService();
