import client from "apis/config";

export const getDropdownGroupsApi = async () => {
  return await client.get(`/dropdowns/groups`);
};

export const addDropdownGroupsApi = async (data) => {
  return await client.post(`/dropdowns/groups`, data);
};

export const updateDropdownGroupsApi = async (id, data) => {
  return await client.put(`/dropdowns/groups/${id}`, data);
};

export const deleteDropdownGroupsApi = async (id) => {
  return await client.delete(`/dropdowns/groups/${id}`);
};

export const getDropdownCnfigurationApi = async (queryParams) => {
  return await client.get(`dropdowns?${queryParams}`);
};

export const addDropdownCnfigurationApi = async (data) => {
  return await client.post("dropdowns", data);
};

export const updateDropdownCnfigurationApi = async (id, data) => {
  return await client.put(`dropdowns/${id}`, data);
};

export const deleteDropdownCnfigurationApi = async (id) => {
  return await client.delete(`dropdowns/${id}`);
};
