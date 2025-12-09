"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function QuizTake() {
  const { cid, qid } = useParams() as any;
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState<any>(null);
  const { currentUser } = useSelector(
    (state: any) => state.accountReducer || { currentUser: null }
  );

  const fetch = async () => {
    try {
      const q = await client.findQuizById(qid as string);
      const qs = await client.findQuestionsForQuiz(qid as string);
      setQuiz(q);
      setQuestions(qs || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [qid]);

  const choose = (questionId: string, payload: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: payload }));
  };

  const submit = async () => {
    try {
      const payload = questions.map((q) => {
        const ans = answers[q._id];
        if (q.type === "MULTIPLE_CHOICE")
          return { question: q._id, choiceId: ans || null };
        if (q.type === "TRUE_FALSE")
          return { question: q._id, answerText: ans ? "true" : "false" };
        return { question: q._id, answerText: ans || "" };
      });

      const result = await client.submitAttempt(qid as string, payload);
      setSubmitted(result);
    } catch (err) {
      console.error(err);
      alert("Failed to submit attempt. Are you logged in?");
    }
  };

  if (!quiz) return <div>Loading...</div>;

  // if quiz is unpublished, prevent students from taking it
  if (!quiz.published && currentUser?.role !== "FACULTY") {
    return (
      <div className="alert alert-warning">This quiz is not available.</div>
    );
  }

  if (submitted) {
    return (
      <div>
        <h3>Results: {submitted.score} points</h3>
        <div>Attempt #{submitted.attemptNumber}</div>
        <ul>
          {submitted.answers.map((a: any) => {
            const q = questions.find((qq) => qq._id === a.question);
            return (
              <li key={a.question}>
                <div>
                  <b>{q?.title || q?.questionText}</b>
                </div>
                <div>Answered: {a.choiceId || a.answerText}</div>
                <div>
                  Correct: {a.isCorrect ? "Yes" : "No"} — +{a.awardedPoints}
                </div>
              </li>
            );
          })}
        </ul>
        <Button
          onClick={() => {
            setSubmitted(null);
            fetch();
          }}
        >
          Retake
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h3>{quiz.title}</h3>
      <div className="mb-2">{quiz.description}</div>
      <Form>
        {questions.map((q) => (
          <div key={q._id} className="card mb-2 p-2">
            <div>
              <b>{q.title || q.questionText}</b>
            </div>
            <div className="mt-1">
              {q.type === "MULTIPLE_CHOICE" &&
                q.choices?.map((c: any) => (
                  <div key={c._id} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`q-${q._id}`}
                      id={`q-${q._id}-${c._id}`}
                      checked={answers[q._id] === c._id}
                      onChange={() => choose(q._id, c._id)}
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor={`q-${q._id}-${c._id}`}
                    >
                      {c.text}
                    </label>
                  </div>
                ))}

              {q.type === "TRUE_FALSE" && (
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`q-${q._id}`}
                      id={`q-${q._id}-true`}
                      checked={answers[q._id] === true}
                      onChange={() => choose(q._id, true)}
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor={`q-${q._id}-true`}
                    >
                      True
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`q-${q._id}`}
                      id={`q-${q._id}-false`}
                      checked={answers[q._id] === false}
                      onChange={() => choose(q._id, false)}
                    />
                    <label
                      className="form-check-label ms-2"
                      htmlFor={`q-${q._id}-false`}
                    >
                      False
                    </label>
                  </div>
                </div>
              )}

              {q.type === "FILL_IN_THE_BLANK" && (
                <input
                  className="form-control"
                  value={answers[q._id] || ""}
                  onChange={(e) => choose(q._id, e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
        <Button onClick={submit}>Submit Attempt</Button>
      </Form>
    </div>
  );
}
