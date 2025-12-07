"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { Button } from "react-bootstrap";

export default function QuizPreview() {
  const { cid, qid } = useParams() as any;
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

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

  if (!quiz) return <div>Loading...</div>;

  const compute = () => {
    let total = 0;
    const list = questions.map((q) => {
      const correct =
        q.type === "MULTIPLE_CHOICE"
          ? q.choices?.filter((c: any) => c.isCorrect)
          : q.type === "TRUE_FALSE"
          ? q.correctBoolean
          : q.correctAnswers || [];
      total += q.points || 0;
      return { q, correct };
    });
    return { list, total };
  };

  const { list, total } = compute();

  return (
    <div>
      <h3>Preview: {quiz.title}</h3>
      <div className="mb-2">{quiz.description}</div>
      <div>
        <b>Total points:</b> {total}
      </div>
      <ul>
        {list.map(({ q, correct }: any) => (
          <li key={q._id} className="mb-3">
            <div>
              <b>{q.title || q.questionText}</b>
            </div>
            <div>
              {q.type === "MULTIPLE_CHOICE" && (
                <ul>
                  {q.choices?.map((c: any) => (
                    <li key={c._id}>
                      {c.text} {c.isCorrect ? "(correct)" : ""}
                    </li>
                  ))}
                </ul>
              )}
              {q.type === "TRUE_FALSE" && (
                <div>Correct answer: {q.correctBoolean ? "True" : "False"}</div>
              )}
              {q.type === "FILL_IN_THE_BLANK" && (
                <div>
                  Correct answers: {(q.correctAnswers || []).join(", ")}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div>
        <Button onClick={() => window.history.back()}>Back</Button>
      </div>
    </div>
  );
}
