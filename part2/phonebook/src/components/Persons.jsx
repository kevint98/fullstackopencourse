import personService from "../services/persons";
import Person from "./Person";

const Persons = ({ persons, editPersons }) => {
  const handleDelete = (id) => {
    const personToDelete = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.deletePerson(personToDelete);
      const newPersons = persons.filter((p) => p.id !== id);
      editPersons(newPersons);
    }
  };

  return (
    <div>
      {persons.map(({ name, number, id }) => (
        <Person
          key={id}
          name={name}
          number={number}
          handleDelete={() => handleDelete(id)}
        />
      ))}
    </div>
  );
};

export default Persons;
