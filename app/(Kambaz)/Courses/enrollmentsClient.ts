import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const USERS_API = `${HTTP_SERVER}/api/users`;

export const findEnrollmentsForCurrentUser = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/enrollments`
  );
  return data;
};

export const enrollCurrentUser = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/enrollments`,
    { course: courseId }
  );
  return data;
};

export const unenrollCurrentUser = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${USERS_API}/current/enrollments/${courseId}`
  );
  return data;
};
