import axios from "axios";

import { getCodeSandboxHost } from "@codesandbox/utils";
const port = 3000;
const apiUrl = `https://${getCodeSandboxHost(port)}/api`;

export const fetchData = async (sql_query) => {
  try {
    const response = await axios.post(`${apiUrl}/query`, { sql: sql_query });
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data.data : error.message;
  }
};

export const saveStateToServer = async (state) => {
  try {
    const stateToSave = JSON.stringify(state);
    const response = await axios.post(`${apiUrl}/saveState`, {
      data: stateToSave,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const loadStateFromServer = async () => {
  try {
    const response = await axios.get(`${apiUrl}/loadState`);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
