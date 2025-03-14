# Task Manager App

A simple and intuitive Task Manager application built with React Native and TypeScript. This app allows users to manage their daily tasks with basic functionality like adding, completing, and deleting tasks.

## Features

- Add new tasks with descriptions
- Mark tasks as complete/incomplete
- Delete tasks
- Clean and modern user interface
- Visual feedback for task status
- Responsive design that works on both iOS and Android

## Prerequisites

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


## Usage

1. **Adding a Task**
   - Type your task in the input field at the top
   - Press the green "+" button or hit enter to add the task

2. **Completing a Task**
   - Tap the checkbox next to a task to mark it as complete/incomplete
   - Completed tasks will be marked with a checkmark and strikethrough text

3. **Deleting a Task**
   - Tap the red trash icon next to a task to delete it

## Technologies Used

- React Native
- TypeScript
- Expo Vector Icons
- React Native's built-in components and APIs

## Project Structure

```
taskManager/
├── app/
│   └── index.tsx        # Main App component
├── components/
│   ├── TaskItem.tsx     # Individual task component
│   └── TaskList.tsx     # Task list and management component
└── ...
```

## Contributing

Feel free to submit issues and enhancement requests!