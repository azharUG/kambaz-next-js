"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "./client";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function QuizzesList() {
  const { cid } = useParams() as any;
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const { currentUser } = useSelector(
    (state: any) => state.accountReducer || { currentUser: null }
  );

  const fetch = async () => {
    try {
      const list = await client.findQuizzesForCourse(cid as string);
      setQuizzes(list || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [cid]);

  const onAdd = async () => {
    try {
      const created = await client.createQuizForCourse(cid as string);
      router.push(`/Courses/${cid}/Quizzes/${created._id}/Edit`);
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async (qid: string) => {
    if (!confirm("Delete quiz?")) return;
    await client.deleteQuiz(qid);
    setQuizzes(quizzes.filter((q) => q._id !== qid));
  };

  const onTogglePublish = async (quiz: any) => {
    try {
      await client.publishQuiz(quiz._id, !quiz.published);
      fetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h3>Quizzes</h3>
      {currentUser && currentUser.role === "FACULTY" && (
        <Button className="float-end mb-2" onClick={onAdd}>
          + Quiz
        </Button>
      )}
      <br />
      {quizzes.length === 0 ? (
        <div className="alert alert-secondary">
          No quizzes yet. Click + Quiz to add one.
        </div>
      ) : (
        <Table striped>
          <thead>
            <tr>
              <th>Title</th>
              <th>Availability</th>
              <th>Points</th>
              <th>Questions</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((q) => (
              <tr key={q._id}>
                <td>
                  <a href={`/Courses/${cid}/Quizzes/${q._id}`}>{q.title}</a>
                </td>
                <td>
                  {!q.published
                    ? "Not available"
                    : q.availableDate && new Date() < new Date(q.availableDate)
                    ? `Not available until ${new Date(
                        q.availableDate
                      ).toLocaleDateString()}`
                    : q.untilDate && new Date() > new Date(q.untilDate)
                    ? "Closed"
                    : "Available"}
                </td>
                <td>{q.points || 0}</td>
                <td>{q.questionsCount || "-"}</td>
                <td>
                  <button
                    className="btn btn-link"
                    onClick={() => onTogglePublish(q)}
                  >
                    {q.published ? "✅" : "🚫"}
                  </button>
                </td>
                <td>
                  {currentUser && currentUser.role === "FACULTY" && (
                    <>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() =>
                          router.push(`/Courses/${cid}/Quizzes/${q._id}/Edit`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(q._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
