import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${HTTP_SERVER}/api/users`;

export const signin = async (credentials: any) => {
  try {
    const response = await axiosWithCredentials.post(
      `${USERS_API}/signin`,
      credentials
    );
    return response.data;
  } catch (err: any) {
    // If not authenticated, return null so caller can handle it instead of throwing
    if (err?.response?.status === 401) return null;
    throw err;
  }
};

export const signup = async (user: any) => {
  try {
    const response = await axiosWithCredentials.post(
      `${USERS_API}/signup`,
      user
    );
    return response.data;
  } catch (err: any) {
    if (err?.response?.status === 401) return null;
    throw err;
  }
};

export const updateUser = async (user: any) => {
  try {
    const response = await axiosWithCredentials.put(
      `${USERS_API}/${user._id}`,
      user
    );
    return response.data;
  } catch (err: any) {
    if (err?.response?.status === 401) return null;
    throw err;
  }
};

export const profile = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
  } catch (err: any) {
    if (err?.response?.status === 401) return null;
    throw err;
  }
};

export const signout = async () => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
  } catch (err: any) {
    if (err?.response?.status === 401) return null;
    throw err;
  }
};
