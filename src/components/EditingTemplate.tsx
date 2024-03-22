import { FormEvent, ChangeEvent } from "react";

function EditingTemplate(props: {
  id: string,
  name: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  onClick: () => void,
  onSubmit: (event: FormEvent<HTMLFormElement>) => void,
  value: string,
}) {
  return (
    <form className="stack-small" onSubmit={props.onSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>New name for {props.name}</label>
        <input
          className="todo-text"
          id={props.id}
          onChange={props.onChange}
          type="text"
          value={props.value}
        />
      </div>
      <div className="btn-group">
        <button
          className="btn todo-cancel"
          onClick={props.onClick}
          type="button"
        >Cancel</button>
        <button className="btn btn__primary todo-edit" type="submit">Save</button>
      </div>
    </form>
  );
}

export default EditingTemplate;
