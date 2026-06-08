export interface Todo {
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

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Statistics {
  totalTodos: number;
  completedTodos: number;
  completionRate: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
  overdueTodos: number;
  dueTodayTodos: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
  reminderTime: number;
  sortBy: 'dueDate' | 'priority' | 'created' | 'title';
  filterBy: 'all' | 'active' | 'completed';
  categoriesView: 'list' | 'grid';
}
