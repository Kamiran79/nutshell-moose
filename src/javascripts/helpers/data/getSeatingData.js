import axios from 'axios';
import apiKeys from '../apiKeys.json';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getSeating = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/seating.json`)
    .then(({ data }) => resolve(utils.firebaseArray(data)))
    .catch((err) => reject(err));
});

const addTable = (newSeatingObj) => axios.post(`${baseUrl}/seating.json`, newSeatingObj);

const updateTable = (tableId, editedTable) => axios.put(`${baseUrl}/seating/${tableId}.json`, editedTable);

const deleteTable = (tableId) => axios.delete(`${baseUrl}/seating/${tableId}.json`);

const getTableByDate = (date) => axios.get(`${baseUrl}/seating.json?orderBy="date"&equalTo="${date}"`);

// WIP: this function was to check existing table numbers and return the one table if it matched, and return null if not

// const getTableById = (tableNumber) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/seating.json?orderBy="tableNum"&equalTo"${tableNumber}"`)
//     .then(({ data }) => resolve(utils.firebaseArray(data)))
//     .catch((err) => reject(err));
// });

export default {
  getSeating,
  addTable,
  updateTable,
  deleteTable,
  getTableByDate,
};
