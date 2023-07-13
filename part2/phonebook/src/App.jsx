import { useState, useEffect } from 'react';
import personService from './services/persons';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');

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
          .then((returnedPerson) =>
            setPersons(
              persons.map((p) =>
                p.id !== updatedPerson.id ? p : returnedPerson
              )
            )
          )
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
          .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameFilter = (event) => setNameFilter(event.target.value);

  const personsToShow =
    nameFilter === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(nameFilter.toLocaleLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>

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
