import { ChangeEvent, FormEvent, useState } from "react";

import EditingTemplate from "./EditingTemplate";
import ViewTemplate from "./ViewTemplate";

function Todo(props: {
  completed: boolean,
  deleteTask: (arg0: string) => void,
  editTask: (arg0: string, arg1: string) => void,
  id: string,
  name: string,
  toggleTaskCompleted: (arg0: string) => void,
}) {
  const [ isEditing, setEditing ] = useState(false);
  const [ newName, setNewName ] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value);
  }

  function onEditingClick () {
    setEditing(false);
  }

  function onViewChange () {
    props.toggleTaskCompleted(props.id);
  }

  function onDeleteClick() {
    props.deleteTask(props.id);
  }

  function onEditClick() {
    setEditing(true);
  }

  return (
    <li className="todo">
      {
        isEditing ?
        <EditingTemplate
          id={props.id}
          name={props.name}
          onChange={handleChange}
          onClick={onEditingClick}
          onSubmit={handleSubmit}
          value={newName}
        /> :
        <ViewTemplate
          completed={props.completed}
          id={props.id}
          name={props.name}
          onChange={onViewChange}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      }
    </li>
  );
}

export default Todo;
