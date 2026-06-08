import Foundation

class StorageService: ObservableObject {
    static let shared = StorageService()
    
    private let todoKey = "todos"
    private let categoryKey = "categories"
    private let encoder = JSONEncoder()
    private let decoder = JSONDecoder()
    
    @Published var todos: [Todo] = []
    @Published var categories: [Category] = []
    
    private init() {
        loadTodos()
        loadCategories()
    }
    
    // MARK: - Todos
    
    func saveTodo(_ todo: Todo) {
        if let index = todos.firstIndex(where: { $0.id == todo.id }) {
            todos[index] = todo
        } else {
            todos.append(todo)
        }
        persistTodos()
    }
    
    func deleteTodo(_ id: String) {
        todos.removeAll { $0.id == id }
        persistTodos()
    }
    
    func getTodo(_ id: String) -> Todo? {
        todos.first { $0.id == id }
    }
    
    func loadTodos() {
        guard let data = UserDefaults.standard.data(forKey: todoKey) else {
            todos = []
            return
        }
        
        do {
            todos = try decoder.decode([Todo].self, from: data)
        } catch {
            print("Error decoding todos: \(error)")
            todos = []
        }
    }
    
    private func persistTodos() {
        do {
            let data = try encoder.encode(todos)
            UserDefaults.standard.set(data, forKey: todoKey)
        } catch {
            print("Error encoding todos: \(error)")
        }
    }
    
    // MARK: - Categories
    
    func saveCategory(_ category: Category) {
        if let index = categories.firstIndex(where: { $0.id == category.id }) {
            categories[index] = category
        } else {
            categories.append(category)
        }
        persistCategories()
    }
    
    func deleteCategory(_ id: String) {
        categories.removeAll { $0.id == id }
        persistCategories()
    }
    
    func loadCategories() {
        guard let data = UserDefaults.standard.data(forKey: categoryKey) else {
            categories = []
            return
        }
        
        do {
            categories = try decoder.decode([Category].self, from: data)
        } catch {
            print("Error decoding categories: \(error)")
            categories = []
        }
    }
    
    private func persistCategories() {
        do {
            let data = try encoder.encode(categories)
            UserDefaults.standard.set(data, forKey: categoryKey)
        } catch {
            print("Error encoding categories: \(error)")
        }
    }
}
