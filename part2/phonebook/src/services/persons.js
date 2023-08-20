import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((response) => response.data);
};

const deletePerson = (personObject) => {
  return axios.delete(`${baseUrl}/${personObject.id}`);
};

const updatePerson = (personObject) => {
  const request = axios.put(`${baseUrl}/${personObject.id}`, personObject);
  return request.then((response) => response.data);
};

export default {
  getAll,
  createPerson,
  deletePerson,
  updatePerson,
};
