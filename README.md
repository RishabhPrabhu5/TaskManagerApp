# Task Manager App

A simple and intuitive Task Manager application built with React Native and TypeScript. This app allows users to organize, priortize and manage their tasks with basic functionality like adding, completing, and deleting tasks.

## Creator

Rishabh Prabhu

Studying Math and Computer Science @ Carnegie Mellon University

## Features

### Task Management
- **Add Tasks**: Create new tasks with titles and optional due dates
- **Delete Tasks**: Remove tasks using the trash icon
- **Complete Tasks**: Mark tasks as complete by tapping on them
- **Task Sorting**: Tasks are automatically sorted by:
  1. Completion status (incomplete tasks first)
  2. Due date (earliest first)
  3. Tasks without due dates appear last in their respective groups

### Due Date Functionality
- **Date Input**: Enter due dates in MM/DD/YY format (e.g., "03/15/24")
- **Date Validation**:
  - Enforces correct date format (MM/DD/YY)
  - Validates real dates (prevents entries like "02/31/24")
  - Only allows future dates
  - Shows visual feedback with teal color for valid dates
- **Format Requirements**:
  - Month: 01-12
  - Day: 01-31 (adjusted per month)
  - Year: Last two digits (20XX) (won't work as intended past 2100 lol)
  - Must include leading zeros

### User Interface
  - Visual feedback for actions
  - Dark theme with accent colors
- **Task Display**:
  - Clear task titles
  - Formatted due dates
  - Completion status indicators
  - Delete buttons
- **Input Features**:
  - Task title/short description input
  - Date input field with calendar icon
  - Add button for task creation
- **Task Status**:
  - Completed tasks have strikethrough text
  - Calendar icon changes color for valid dates

## How to Use

1. **Adding a Task**:
   - Enter task title in the main input field
   - Optionally enter a due date in MM/DD/YY format
   - Press the add button or hit return from the task name/description box

2. **Managing Tasks**:
   - Tap a task to mark it as complete
   - Use the trash icon to delete a task
   - Tasks automatically sort by due date and completion status in the following order:
      incomplete tasks by earliest due date, complete tasks by earliest due date.

3. **Date Entry**:
   - Enter dates in MM/DD/YY format (e.g., "03/15/24")
   - Dates must be in the future
   - Leading zeros required for single-digit months and days
   - Refer to due date functionality above


##Built with:
- React Native
- TypeScript
- Expo
- React Native Icons (Ionicons)

##Requirements
- Node.js (v14 or higher)
- npm or yarn
- React Native development environment set up
- iOS Simulator (for Mac users) or Android Emulator

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd taskManager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run the app:
 - Can use ExpoGo app to test deployment
```bash
# For web
npm run web

# For iOS
npm run ios

# For Android
npm run android
```

5. Alternate way to run (React Documentation):\
```bash
npx expo start

#For web:
w
```





## Project Structure

```
taskManager/
├── app/
│   └── index.tsx        # Main App component with layout and structure
├── components/
│   ├── TaskItem.tsx     # Individual task component, imports functions from TaskList
│   └── TaskList.tsx     # Task list and management component, implements overall functionality
└── ...
```

