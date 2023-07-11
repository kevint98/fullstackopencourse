const PersonForm = ({
  handleSubmit,
  nameValue,
  handleNameChange,
  numberValue,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={nameValue} onChange={handleNameChange} /> <br />
        number: <input value={numberValue} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
