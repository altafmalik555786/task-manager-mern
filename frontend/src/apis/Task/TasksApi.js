import client from "apis/config";

export const getTasksApi = async (page, priority = "", search = "") => {
  return await client.get(`tasks?priority=${priority}&search=${search}&page=${page}&limit=10`);
};

export const postTasksApi = async (body) => {
  return await client.post("tasks", body);
};

export const updateTaskApi = async (body) => {
  return await client.put(`tasks`, body);
};

export const patchTaskApi = async (body) => {
  return await client.patch(`tasks`, body);
};

export const deleteTaskApi = async (id) => {
  return await client.delete(`tasks?id=${id}`);
};
