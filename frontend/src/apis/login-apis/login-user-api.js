import client from "../config";
export const login = async (body) => {
  return await client.post("login", body);
}
