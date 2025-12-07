"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../client";
import { Button, FormControl } from "react-bootstrap";

export default function QuizEdit() {
  const { cid, qid } = useParams() as any;
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>({ title: "", description: "" });

  const fetch = async () => {
    try {
      const q = await client.findQuizById(qid as string);
      setQuiz(q || { title: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [qid]);

  const save = async () => {
    try {
      await client.updateQuiz(quiz);
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } catch (err) {
      console.error(err);
    }
  };

  const saveAndPublish = async () => {
    try {
      await client.updateQuiz(quiz);
      await client.publishQuiz(qid as string, true);
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (err) {
      console.error(err);
    }
  };

  const cancel = () => router.push(`/Courses/${cid}/Quizzes`);

  return (
    <div>
      <h3>Edit Quiz</h3>
      <div className="mb-2">
        <button
          className="btn btn-secondary me-2"
          onClick={() =>
            router.push(`/Courses/${cid}/Quizzes/${qid}/Questions`)
          }
        >
          Edit Questions
        </button>
      </div>
      <FormControl
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        className="mb-2"
      />
      <FormControl
        as="textarea"
        rows={6}
        value={quiz.description}
        onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        className="mb-2"
      />
      <div>
        <Button className="me-2" onClick={save}>
          Save
        </Button>
        <Button className="me-2" onClick={saveAndPublish}>
          Save & Publish
        </Button>
        <Button variant="secondary" onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
