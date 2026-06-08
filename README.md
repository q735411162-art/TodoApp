# TodoApp - 智能待办事项管理应用

一个功能完整的跨平台待办事项应用，支持本地存储、分类管理、优先级设置、截止日期提醒等多项功能。

## ✨ 主要功能

### 基础功能
- ✅ 创建、编辑、删除待办事项
- ✅ 标记任务完成状态
- ✅ 本地数据持久化存储
- ✅ 快速搜索和过滤
- ✅ 拖拽排序

### 高级功能
- 🏷️ 自定义分类管理
- 🎯 优先级设置（高、中、低）
- 📅 截止日期和提醒
- 🔔 本地通知提醒
- 📊 任务统计和进度
- 🎨 主题定制
- 🔍 高级搜索过滤
- 📤 数据导出导入
- 🗑️ 回收站功能
- ⏱️ 番茄时钟计时器

### 数据管理
- 💾 自动保存
- 🔄 数据备份恢复
- 📊 分类标签管理
- 📈 统计报表

## 🛠️ 技术栈

### Web 版本
- **前端**: React 18 + TypeScript
- **存储**: IndexedDB + LocalStorage
- **样式**: Tailwind CSS
- **状态管理**: Redux Toolkit
- **打包**: Vite

### 移动版本
- **iOS**: Swift + SwiftUI
- **Android**: Kotlin + Jetpack Compose
- **存储**: SQLite + SharedPreferences

### 桌面版本
- **框架**: Electron + React
- **数据库**: SQLite

## 📋 项目结构

```
TodoApp/
├── web/                          # Web 版本
│   ├── src/
│   │   ├── components/           # React 组件
│   │   ├── pages/                # 页面
│   │   ├── store/                # Redux 存储
│   │   ├── services/             # 数据服务
│   │   ├── types/                # TypeScript 类型
│   │   ├── utils/                # 工具函数
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
├── ios/                          # iOS 版本
│   ├── TodoApp.xcodeproj
│   ├── TodoApp/
│   │   ├── Views/                # SwiftUI 视图
│   │   ├── Models/               # 数据模型
│   │   └── Services/             # 存储服务
│   └── Shared/
│
├── android/                      # Android 版本
│   ├── app/
│   │   ├── src/main/java/
│   │   ├── res/
│   │   └── build.gradle
│   └── build.gradle
│
├── desktop/                      # Electron 桌面版本
│   ├── main/                     # 主进程
│   ├── preload/                  # 预加载脚本
│   ├── src/                      # 渲染进程
│   └── package.json
│
├── shared/                       # 共享资源
│   ├── constants/
│   ├── utils/
│   └── types/
│
├── docs/                         # 文档
│   ├── API.md
│   ├── GUIDE.md
│   └── DEVELOPMENT.md
│
└── README.md
```

## 🚀 快速开始

### Web 版本

```bash
cd web
npm install
npm run dev
```

访问 `http://localhost:5173`

### iOS 版本

```bash
cd ios
open TodoApp.xcodeproj
```

在 Xcode 中构建和运行

### Android 版本

```bash
cd android
./gradlew build
./gradlew installDebug
```

### 桌面版本

```bash
cd desktop
npm install
npm run dev
```

## 📱 功能详解

### 1. 任务管理
- 创建新任务：标题必填，描述/分类/优先级可选
- 编辑任务：长按或双击打开编辑对话框
- 删除任务：滑动或点击删除按钮（进入回收站而非永久删除）
- 完成任务：点击任务左侧复选框标记完成

### 2. 分类系统
- 默认创建"个人"分类
- 支持自定义颜色和图标
- 按分类过滤任务
- 统计每个分类的任务数

### 3. 优先级管理
- **高优先级**（红色）：紧急重要任务
- **中优先级**（黄色）：重要但不紧急
- **低优先级**（绿色）：不重要任务
- 按优先级排序和过滤

### 4. 截止日期和提醒
- 设置截止日期
- 自定义提醒时间
- 自动检测逾期任务
- 本地通知推送

### 5. 搜索和过滤
- 全文搜索任务标题和描述
- 按完成状态过滤
- 按分类过滤
- 按优先级过滤
- 多条件组合过滤

### 6. 统计仪表板
- 任务总数和完成数
- 完成率百分比
- 按分类的任务分布
- 按优先级的任务分布
- 逾期任务统计
- 今日到期任务统计

### 7. 番茄时钟
- 25分钟工作时间 + 5分钟休息
- 4个番茄周期后15分钟长休息
- 自动切换阶段
- 完成提醒

### 8. 数据管理
- 自动保存到本地存储
- 手动导出为 JSON/CSV
- 导入备份文件
- 清空回收站

## 💾 本地存储

### 存储位置

**Web 版本**
- IndexedDB：完整数据存储（默认50MB+）
- LocalStorage：用户设置（默认5-10MB）

**iOS 版本**
- UserDefaults：用户偏好设置
- 应用沙箱：任务数据库

**Android 版本**
- SharedPreferences：应用设置
- SQLite 数据库：任务数据

### 数据安全
- ✅ 所有数据存储在本地设备
- ✅ 不上传到任何服务器
- ✅ 支持导出为文件进行备份
- ✅ 支持从文件导入恢复
- ✅ 完全私密和安全

## 📊 数据模型

### Todo 对象

```typescript
interface Todo {
  id: string;                    // 唯一标识
  title: string;                 // 任务标题
  description?: string;          // 任务描述
  completed: boolean;            // 完成状态
  priority: 'low' | 'medium' | 'high';  // 优先级
  categoryId: string;            // 分类ID
  dueDate?: Date | null;         // 截止日期
  remindTime?: Date | null;      // 提醒时间
  tags?: string[];               // 标签
  createdAt: Date;               // 创建时间
  updatedAt: Date;               // 更新时间
  completedAt?: Date | null;     // 完成时间
  isDeleted: boolean;            // 删除标记
}
```

### Category 对象

```typescript
interface Category {
  id: string;                    // 唯一标识
  name: string;                  // 分类名称
  color: string;                 // 颜色代码
  icon: string;                  // 图标
  description?: string;          // 描述
  createdAt: Date;               // 创建时间
  updatedAt: Date;               // 更新时间
}
```

## 🔄 同步机制

### 自动保存
```
用户操作 → 1秒去抖 → 本地存储 → 用户反馈
```

### 云同步（可选功能）
```
本地更改 → 网络检测 → 上传到服务器 → 同步其他设备
```

### 冲突解决
- 时间戳对比
- 最后更新获胜
- 手动解决选项

## 🎨 主题定制

- 🌙 深色模式
- ☀️ 浅色模式
- 🔄 自动模式
- 🎨 自定义颜色主题
- 📱 响应式设计

## ⚡ 性能优化

- 🚀 快速加载（<2秒）
- 📊 流畅滚动（60fps）
- 🔋 低电耗
- 💾 小包体积（<5MB）
- 🧠 内存高效

## 🔒 安全和隐私

- ✅ 本地存储，无云上传
- ✅ 无跟踪和分析
- ✅ 无广告
- ✅ 完整的数据导出
- ✅ 完整的数据删除

## 🛠️ 开发

### 环境要求

- Node.js 16+
- npm 7+ 或 yarn
- Xcode 13+ （iOS 开发）
- Android Studio 2021+ （Android 开发）

### 安装依赖

```bash
# Web
cd web && npm install

# iOS
cd ios && pod install

# Android
cd android && ./gradlew build
```

### 运行测试

```bash
cd web
npm run test
npm run test:coverage
```

### 构建

```bash
# Web 生产构建
cd web
npm run build

# iOS 发布构建
xcodebuild -scheme TodoApp -configuration Release

# Android 发布构建
cd android
./gradlew assembleRelease
```

## 📚 文档

- [用户指南](./docs/GUIDE.md) - 详细的功能说明和使用技巧
- [API 文档](./docs/API.md) - 数据存储和 API 接口
- [开发指南](./docs/DEVELOPMENT.md) - 开发者贡献指南

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 💬 反馈和支持

- 🐛 Bug 报告：[GitHub Issues](https://github.com/q735411162-art/TodoApp/issues)
- 💡 功能建议：[GitHub Discussions](https://github.com/q735411162-art/TodoApp/discussions)
- 📧 邮件：support@todoapp.com

## 🙏 致谢

感谢所有使用和支持 TodoApp 的用户！

---

**祝你使用愉快！** 🎉
