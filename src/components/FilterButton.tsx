function FilterButton(props: {
  isPressed: boolean,
  name: string,
  setFilter: (arg0: string) => void,
}) {
  return (
    <button
      aria-pressed={props.isPressed}
      className="btn toggle-btn"
      onClick={() => props.setFilter(props.name)}
      type="button"
    >
      <span>{props.name}</span>
    </button>
  );
}

export default FilterButton;
