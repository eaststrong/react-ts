import { ChangeEvent, FormEvent, MutableRefObject, useEffect, useRef, useState } from "react";

function usePrevious(value: any): boolean {
  const ref: MutableRefObject<any> = useRef(null);
  useEffect(() => {ref.current = value});
  return ref.current;
}

function Todo(props: { id: string; name: string; completed: boolean; toggleTaskCompleted: (arg0: string) => void; deleteTask: (arg0: string) => void; editTask: (arg0: string, arg1: string) => void; }) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editFieldRef: MutableRefObject<any> = useRef(null);
  const editButtonRef: MutableRefObject<any> = useRef(null);
  const wasEditing: boolean = usePrevious(isEditing);

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>New name for {props.name}</label>
        <input
          className="todo-text"
          id={props.id}
          onChange={handleChange}
          ref={editFieldRef}
          type="text"
          value={newName}
        />
      </div>
      <div className="btn-group">
        <button
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
          type="button"
        >Cancel</button>
        <button className="btn btn__primary todo-edit" type="submit">Save</button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          defaultChecked={props.completed}
          id={props.id}
          onChange={() => props.toggleTaskCompleted(props.id)}
          type="checkbox"
        />
        <label className="todo-label" htmlFor={props.id}>{props.name}</label>
      </div>
      <div className="btn-group">
        <button
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
          type="button"
        >Edit</button>
        <button
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}
          type="button"
        >Delete</button>
      </div>
    </div>
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewName(event.target.value);
  }

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [ wasEditing, isEditing, ]);

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;
