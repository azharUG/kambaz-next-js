"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../client";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function QuizDetails() {
  const { cid, qid } = useParams() as any;
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const { currentUser } = useSelector(
    (state: any) => state.accountReducer || { currentUser: null }
  );

  const fetch = async () => {
    try {
      const q = await client.findQuizById(qid as string);
      setQuiz(q);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h3>{quiz.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: quiz.description || "" }} />
      <p>Type: {quiz.quizType}</p>
      <p>Points: {quiz.points || 0}</p>
      <p>
        Available:{" "}
        {!quiz.published
          ? "Not available"
          : quiz.availableDate
          ? new Date(quiz.availableDate).toLocaleString()
          : "-"}{" "}
        until{" "}
        {!quiz.published
          ? "-"
          : quiz.untilDate
          ? new Date(quiz.untilDate).toLocaleString()
          : "-"}
      </p>
      {currentUser && currentUser.role === "FACULTY" && (
        <>
          <Button
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Edit`)}
            className="me-2"
          >
            Edit
          </Button>
          <Button
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/Preview`)
            }
          >
            Preview
          </Button>
        </>
      )}
      {currentUser && currentUser.role === "STUDENT" && (
        <>
          <Button
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/Take`)}
            disabled={
              !quiz.published ||
              (quiz.availableDate &&
                new Date() < new Date(quiz.availableDate)) ||
              (quiz.untilDate && new Date() > new Date(quiz.untilDate))
            }
          >
            Take Quiz
          </Button>
          {!quiz.published && (
            <div className="text-warning mt-2">Not available</div>
          )}
        </>
      )}
    </div>
  );
}
