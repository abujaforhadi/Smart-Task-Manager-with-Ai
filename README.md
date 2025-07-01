# Smart Task Manager with AI Assistance

A modern task management application built with Next.js 15 and TypeScript, featuring AI-powered subtask suggestions using Google Gemini API.

## Live Demo

Check out the app here: [https://smarttaskbd.vercel.app/](https://smarttaskbd.vercel.app/)

## Features

- ✅ **Complete Task Management**: Add, edit, delete, and toggle task completion
- 🤖 **AI-Powered Subtasks**: Generate actionable subtasks using Google Gemini AI
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean interface built with shadcn/ui components
- 💾 **Local Storage**: Tasks persist between sessions
- 📅 **Due Date Tracking**: Visual indicators for overdue tasks
- 🔄 **Real-time Updates**: Instant UI updates for all task operations

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Google Gemini API** - AI-powered subtask generation
- **AI SDK** - Streamlined AI integration
- **date-fns** - Date formatting utilities
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Google Gemini API key

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <https://github.com/abujaforhadi/Smart-Task-Manager-with-Ai>
   cd smart-task-manager
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Set up environment variables**
   
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   \`\`\`

   Get your free API key from: https://aistudio.google.com/app/apikey

4. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Basic Task Management
- Click "Add Task" to create a new task
- Fill in the title, description (optional), and due date
- Click on the circle icon to mark tasks as complete
- Use the edit and delete buttons to modify tasks

### AI Subtask Generation
- For pending tasks, click the "Suggest Subtasks" button
- The AI will analyze your task and generate 3-5 actionable subtasks
- Subtasks appear in a highlighted section below the task

### Example Usage
**Task**: "Prepare for job interview"
**AI Suggestions**:
1. Research the company and role
2. Practice common interview questions
3. Prepare questions to ask the interviewer
4. Review and update your resume
5. Choose appropriate interview attire

## Project Structure

\`\`\`
smart-task-manager/
├── app/
│   ├── api/generate-subtasks/
│   │   └── route.ts          # Gemini API integration
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx              # Main application page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── task-card.tsx         # Individual task display
│   ├── task-form.tsx         # Task creation/editing form
│   └── task-list.tsx         # Task list container
├── types/
│   └── task.ts               # TypeScript type definitions
└── README.md
\`\`\`

## API Routes

### POST /api/generate-subtasks
Generates AI-powered subtasks for a given task.

**Request Body:**
\`\`\`json
{
  "title": "Task title",
  "description": "Optional task description"
}
\`\`\`

**Response:**
\`\`\`json
{
  "subtasks": [
    "Subtask 1",
    "Subtask 2",
    "Subtask 3"
  ]
}
\`\`\`

## Challenges Faced & Solutions

### 1. **AI Integration Complexity**
- **Challenge**: Integrating Google Gemini API with proper error handling
- **Solution**: Used AI SDK for streamlined integration and implemented comprehensive error handling

### 2. **State Management**
- **Challenge**: Managing task state across components without external state management
- **Solution**: Lifted state up to the main component and used localStorage for persistence

### 3. **Responsive Design**
- **Challenge**: Ensuring the app works well on both desktop and mobile
- **Solution**: Used Tailwind CSS grid system and responsive utilities

### 4. **Type Safety**
- **Challenge**: Maintaining type safety across the application
- **Solution**: Comprehensive TypeScript interfaces and proper typing for all components

## Environment Variables

Create a \`.env.local\` file with the following variables:

\`\`\`env
# Required: Google Gemini API Key
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Google Gemini AI for intelligent subtask generation
- shadcn/ui for beautiful UI components
- Vercel AI SDK for seamless AI integration
