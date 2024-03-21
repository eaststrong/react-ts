import { nanoid } from "nanoid";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";
import Task from './types/task.ts';

function usePrevious(value: number): number {
  const ref: MutableRefObject<any> = useRef(null);
  console.log(ref);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const FILTER_MAP = {
  All: () => true,
  Active: (task: Task) => !task.completed,
  Completed: (task: Task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props: { tasks: Task[]; }) {
  const [ tasks, setTasks ] = useState(props.tasks);
  const [ filter, setFilter ] = useState("All");
  const listHeadingRef: MutableRefObject<any> = useRef(null);
  const prevTaskLength: number = usePrevious(tasks.length);

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      isPressed={name === filter}
      key={name}
      name={name}
      setFilter={setFilter}
    />
  ));

  const taskList = tasks
    ?.filter(FILTER_MAP[filter as keyof typeof FILTER_MAP])
    .map((task: Task) => (
      <Todo
        completed={task.completed}
        deleteTask={deleteTask}
        editTask={editTask}
        id={task.id}
        key={task.id}
        name={task.name}
        toggleTaskCompleted={toggleTaskCompleted}
      />
    ))
  ;

  const tasksNoun = taskList.length < 2 ? "task" : "tasks";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function toggleTaskCompleted(id: string) {
    const updatedTasks: Task[] = tasks?.map((task: Task) => {
      if (id === task.id) return { ...task, completed: !task.completed, };
      return task;
    });

    setTasks(updatedTasks);
  }

  function deleteTask(id: string) {
    const remainingTasks = tasks?.filter((task: Task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id: string, newName: string) {
    const editedTaskList: Task[] = tasks?.map((task: Task) => {
      if (id === task.id) return { ...task, name: newName, };
      return task;
    });

    setTasks(editedTaskList);
  }

  function addTask(name: string) {
    const newTask: Task = { id: `todo-${nanoid()}`, name, completed: false, };
    setTasks([ ...tasks, newTask, ]);
  }

  useEffect(
    () => {
      if (tasks.length < prevTaskLength) listHeadingRef.current.focus();
    },
    [ tasks.length, prevTaskLength ]
  );

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2
        id="list-heading"
        ref={listHeadingRef}
        tabIndex={-1}
      >
        {headingText}
      </h2>
      <ul
        aria-labelledby="list-heading"
        className="todo-list stack-large stack-exception"
        role="list"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
