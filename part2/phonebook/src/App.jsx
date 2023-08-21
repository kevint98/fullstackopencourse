import { useState, useEffect } from "react";
import personService from "./services/persons";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [message, setMessage] = useState({ body: "", type: "success" });

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const updatePerson = (person) => {
    const foundPerson = persons.find((p) => p.name === person.name);
    const updatedPerson = { ...foundPerson, number: newNumber };

    return window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    )
      ? personService
          .updatePerson(updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id !== updatedPerson.id ? p : returnedPerson
              )
            );
            setMessage({ ...message, body: `Updated ${newName}` });
            setTimeout(() => {
              setMessage({ ...message, body: "" });
            }, 5000);
          })
          .catch((error) => {
            setMessage({
              ...message,
              body: error.response.data.error,
              type: "error",
            });
            setTimeout(() => {
              setMessage({ ...message, body: "" });
            }, 5000);
            if (error.response.status === 404) {
              setPersons(persons.filter((p) => p.id !== foundPerson.id));
            }
          })
      : null;
  };

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    persons.some((person) => person.name === newName)
      ? updatePerson(newPerson)
      : personService
          .createPerson(newPerson)
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setMessage({ ...message, body: `Added ${newName}` });
            setTimeout(() => {
              setMessage({ ...message, body: "" });
            }, 5000);
          })
          .catch((error) => {
            setMessage({
              ...message,
              body: error.response.data.error,
              type: "error",
            });
            setTimeout(() => {
              setMessage({ ...message, body: "" });
            }, 5000);
          });

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameFilter = (event) => setNameFilter(event.target.value);

  const personsToShow =
    nameFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(nameFilter.toLocaleLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter value={nameFilter} handleChange={handleNameFilter} />

      <h2>Add a New Person</h2>

      <PersonForm
        handleSubmit={addPerson}
        nameValue={newName}
        handleNameChange={handleNameChange}
        numberValue={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} editPersons={setPersons} />
    </div>
  );
};

export default App;
