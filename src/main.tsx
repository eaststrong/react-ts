import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Task from './types/task.ts';

const DATA: Task[] = [
  {
    completed: true,
    id: "todo-0",
    name: "Eat",
  },
  {
    completed: false,
    id: "todo-1",
    name: "Sleep",
  },
  {
    completed: false,
    id: "todo-2",
    name: "Repeat",
  },
];

const root: HTMLElement = document.getElementById('root')!;

ReactDOM
  .createRoot(root)
  .render(
    <React.StrictMode>
      <App tasks={DATA} />
    </React.StrictMode>,
  )
;
