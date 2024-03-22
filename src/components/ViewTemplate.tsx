function ViewTemplate(props: {
  completed: boolean,
  id: string,
  name: string,
  onChange: () => void,
  onDeleteClick: () => void,
  onEditClick: () => void,
}) {
  return (
    <div className="stack-small">
      <div className="c-cb">
        <input
          defaultChecked={props.completed}
          id={props.id}
          onChange={props.onChange}
          type="checkbox"
        />
        <label className="todo-label" htmlFor={props.id}>{props.name}</label>
      </div>
      <div className="btn-group">
        <button
          className="btn"
          onClick={props.onEditClick}
          type="button"
        >Edit</button>
        <button
          className="btn btn__danger"
          onClick={props.onDeleteClick}
          type="button"
        >Delete</button>
      </div>
    </div>
  );
}

export default ViewTemplate;
