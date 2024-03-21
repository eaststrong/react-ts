import { ChangeEvent, FormEvent, useState } from "react";

function Form(props: { addTask: (arg0: string) => void; }) {
  const [ name, setName ] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.addTask(name);
    setName("");
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label className="label__lg" htmlFor="new-todo-input">What needs to be done?</label>
      </h2>
      <input
        autoComplete="off"
        className="input input__lg"
        id="new-todo-input"
        name="text"
        onChange={handleChange}
        type="text"
        value={name}
      />
      <button className="btn btn__primary btn__lg" type="submit">Add</button>
    </form>
  );
}

export default Form;
