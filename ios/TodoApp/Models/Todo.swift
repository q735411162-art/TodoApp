import Foundation

enum Priority: String, Codable {
    case low
    case medium
    case high
}

struct Todo: Identifiable, Codable {
    let id: String
    var title: String
    var description: String?
    var completed: Bool
    var priority: Priority
    var categoryId: String
    var dueDate: Date?
    var remindTime: Date?
    var tags: [String]?
    let createdAt: Date
    var updatedAt: Date
    var completedAt: Date?
    var isDeleted: Bool
    
    var displayPriority: String {
        switch priority {
        case .low:
            return "Low"
        case .medium:
            return "Medium"
        case .high:
            return "High"
        }
    }
    
    var priorityColor: Color {
        switch priority {
        case .low:
            return .green
        case .medium:
            return .yellow
        case .high:
            return .red
        }
    }
}

struct Category: Identifiable, Codable {
    let id: String
    var name: String
    var color: String
    var icon: String
    var description: String?
    let createdAt: Date
    var updatedAt: Date
}

struct Statistics {
    let totalTodos: Int
    let completedTodos: Int
    let completionRate: Int
    let overdueTodos: Int
    let dueTodayTodos: Int
}
