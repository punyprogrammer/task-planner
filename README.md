# Task Planner - Beautiful Goal Management App

A modern, dark-themed task planner built with Next.js, TypeScript, and localStorage. Organize your daily, weekly, and monthly goals with interactive statistics and progress tracking.

## ✨ Features

### 🎯 Task Management
- **Three Goal Sections**: Daily, Weekly, and Monthly goals
- **Task Details**: Title, description, estimated time, and actual completion time
- **Status Tracking**: Not Started, In Progress, and Completed states
- **Task Actions**: Edit, delete, and move tasks between sections

### 📊 Interactive Statistics
- **Real-time Progress**: Completion rates and task counts
- **Visual Charts**: Pie charts, line charts, and bar charts using Recharts
- **Monthly Breakdown**: Track progress over time
- **Status Distribution**: Visual representation of task statuses

### 🎨 Beautiful UI/UX
- **Dark Theme**: Modern, eye-friendly dark interface
- **Responsive Design**: Works perfectly on desktop and mobile
- **Smooth Animations**: Elegant transitions and hover effects
- **Intuitive Navigation**: Tab-based interface for easy switching

### 💾 Data Persistence
- **localStorage**: All data is saved locally in your browser
- **No Backend Required**: Works completely offline
- **Automatic Sync**: Changes are saved instantly

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Storage**: localStorage

## 📱 Usage Guide

### Adding Tasks
1. Navigate to any section (Daily, Weekly, or Monthly)
2. Click "Add Task" button
3. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Estimated time in minutes
   - Select the appropriate section
4. Click "Add Task" to save

### Managing Tasks
- **Expand Task**: Click the chevron icon to see more options
- **Change Status**: Use the status buttons (Not Started, In Progress, Completed)
- **Update Time**: Enter actual completion time
- **Move Task**: Use the "Move" button to transfer between sections
- **Delete Task**: Remove tasks you no longer need

### Viewing Statistics
- Click the "Statistics" tab to see:
  - Overall completion rates
  - Task status distribution
  - Monthly progress trends
  - Interactive charts and graphs

## 🎨 Customization

The app uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Dark theme variants
- Component styling in individual component files

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page component
├── components/         # React components
│   ├── AddTaskModal.tsx
│   ├── Navigation.tsx
│   ├── Stats.tsx
│   ├── TaskCard.tsx
│   └── TaskSection.tsx
├── hooks/              # Custom React hooks
│   └── useTasks.ts
├── types/              # TypeScript type definitions
│   └── task.ts
└── utils/              # Utility functions
    ├── stats.ts
    └── storage.ts
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Task Properties**: Update `src/types/task.ts`
2. **Storage Logic**: Modify `src/utils/storage.ts`
3. **UI Components**: Add to `src/components/`
4. **Statistics**: Extend `src/utils/stats.ts`

## 🌟 Key Features Explained

### localStorage Integration
The app uses localStorage for data persistence without requiring a backend. All task data is stored locally in the browser and automatically synced.

### Interactive Charts
Recharts library provides beautiful, responsive charts that update in real-time as you manage your tasks.

### TypeScript Safety
Full TypeScript implementation ensures type safety and better development experience.

### Responsive Design
Built with mobile-first approach using Tailwind CSS responsive utilities.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Recharts](https://recharts.org/) for the beautiful chart components
- [Lucide React](https://lucide.dev/) for the icon library

---

**Happy Task Planning! 🎯**
