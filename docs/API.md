# TodoApp API 文档

## 本地存储 API

### 初始化

```typescript
import { storageService } from '@/services/storageService';

// 初始化存储服务
await storageService.init();
```

### Todo 操作

#### 添加任务

```typescript
const todo = await todoService.createTodo(
  title,
  categoryId,
  priority = 'medium'
);
```

#### 获取任务

```typescript
// 获取单个任务
const todo = await todoService.getTodo(id);

// 获取所有任务
const todos = await todoService.getAllTodos();

// 搜索任务
const results = await todoService.searchTodos(query);
```

#### 更新任务

```typescript
const updated = await todoService.updateTodo(id, {
  title: 'New Title',
  completed: true,
  priority: 'high',
});
```

#### 删除任务

```typescript
await todoService.deleteTodo(id);
```

### Category 操作

#### 创建分类

```typescript
const category = await todoService.createCategory(
  'Work',
  '#FF6B6B',
  '💼'
);
```

#### 获取分类

```typescript
// 获取所有分类
const categories = await todoService.getAllCategories();
```

### Statistics 操作

#### 获取统计信息

```typescript
const stats = await todoService.getStatistics();
// 返回:
// {
//   totalTodos: number,
//   completedTodos: number,
//   completionRate: number,
//   byCategory: Record<string, number>,
//   byPriority: Record<string, number>,
//   overdueTodos: number,
//   dueTodayTodos: number
// }
```

## Redux 状态管理

### 初始状态

```typescript
interface TodoState {
  todos: Todo[];
  categories: Category[];
  statistics: Statistics | null;
  trash: Todo[];
  loading: boolean;
  error: string | null;
}
```

### Actions

```typescript
import { 
  setTodos, 
  addTodo, 
  updateTodo, 
  removeTodo,
  setCategories,
  addCategory,
  setStatistics,
  setLoading,
  setError 
} from '@/store/todoSlice';

// 使用示例
dispatch(setTodos(todos));
dispatch(addTodo(newTodo));
dispatch(updateTodo(updatedTodo));
```

## 类型定义

### Todo 类型

```typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  categoryId: string;
  dueDate?: Date | null;
  remindTime?: Date | null;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date | null;
  isDeleted: boolean;
}
```

### Category 类型

```typescript
interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Statistics 类型

```typescript
interface Statistics {
  totalTodos: number;
  completedTodos: number;
  completionRate: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
  overdueTodos: number;
  dueTodayTodos: number;
}
```

### AppSettings 类型

```typescript
interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
  reminderTime: number;
  sortBy: 'dueDate' | 'priority' | 'created' | 'title';
  filterBy: 'all' | 'active' | 'completed';
  categoriesView: 'list' | 'grid';
}
```

## 数据持久化

### IndexedDB (Web)

```typescript
// 自动处理，无需手动操作
// 数据存储在浏览器 IndexedDB 中
// 存储容量：通常 50MB+
```

### LocalStorage (Web 设置)

```typescript
// 获取设置
const settings = await storageService.getSettings();

// 更新设置
await storageService.updateSettings({
  theme: 'dark',
  notifications: true,
});
```

## 导出和导入

### 导出数据

```typescript
const jsonString = await storageService.exportData();
// 返回包含所有 todos 和 categories 的 JSON 字符串
```

### 导入数据

```typescript
await storageService.importData(jsonString);
// 导入数据前会清空现有数据
```

## 错误处理

```typescript
try {
  await todoService.createTodo('Task', categoryId);
} catch (error) {
  console.error('Failed to create todo:', error);
  // 处理错误
}
```

## 最佳实践

### 1. 初始化应用

```typescript
useEffect(() => {
  const init = async () => {
    await storageService.init();
    const todos = await todoService.getAllTodos();
    dispatch(setTodos(todos));
  };
  init();
}, []);
```

### 2. 自动保存

```typescript
const debouncedSave = debounce(async (todo) => {
  await todoService.updateTodo(todo.id, todo);
}, 1000);
```

### 3. 错误处理

```typescript
try {
  await operation();
} catch (error) {
  dispatch(setError(error.message));
  setTimeout(() => dispatch(setError(null)), 5000);
}
```
