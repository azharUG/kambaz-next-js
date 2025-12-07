import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const QUIZZES_API = `${HTTP_SERVER}/api/quizzes`;

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};

export const createQuizForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    { title: "New Quiz" }
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};

export const publishQuiz = async (quizId: string, publish: boolean) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/publish`,
    { publish }
  );
  return data;
};

export const findQuizById = async (qid: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${qid}`);
  return data;
};

export const findQuestionsForQuiz = async (qid: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${qid}/questions`);
  return data;
};

export const createQuestionForQuiz = async (qid: string, question: any) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${qid}/questions`,
    question
  );
  return data;
};

export const updateQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/questions/${question._id}`,
    question
  );
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/api/questions/${questionId}`
  );
  return data;
};

export const submitAttempt = async (qid: string, answers: any[]) => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${qid}/attempts`,
    { answers }
  );
  return data;
};

export const findLastAttemptForQuiz = async (qid: string) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${qid}/attempts/last`
  );
  return data;
};
