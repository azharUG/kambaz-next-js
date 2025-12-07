"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "../../client";
import { Button, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function EmptyChoice() {
  return { _id: uuidv4(), text: "", isCorrect: false };
}

export default function QuestionsEditor() {
  const { cid, qid } = useParams() as any;
  const [questions, setQuestions] = useState<any[]>([]);
  const [editing, setEditing] = useState<Record<string, any>>({});

  const fetch = async () => {
    try {
      const list = await client.findQuestionsForQuiz(qid as string);
      setQuestions(list || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [qid]);

  const addQuestion = async () => {
    const q = {
      type: "MULTIPLE_CHOICE",
      title: "New Question",
      points: 1,
      questionText: "",
      choices: [EmptyChoice(), EmptyChoice()],
    };
    try {
      const created = await client.createQuestionForQuiz(qid as string, q);
      setQuestions([...questions, created]);
      setEditing({ ...editing, [created._id]: true });
    } catch (err) {
      console.error(err);
    }
  };

  const saveQuestion = async (q: any) => {
    try {
      // use freshest state for this question
      const current = questions.find((x) => x._id === q._id) || q;

      // Validation / enforce at least one correct answer for types that need it
      if (current.type === "MULTIPLE_CHOICE") {
        const choices = current.choices || [];
        if (!choices.length) {
          alert("Please add at least one choice before saving.");
          return;
        }
        if (!choices.some((c: any) => c.isCorrect)) {
          // auto-select the first choice as correct to avoid saving a question without a correct answer
          const payload = {
            ...current,
            choices: choices.map((c: any, idx: number) => ({
              ...c,
              isCorrect: idx === 0,
            })),
          };
          const updated = await client.updateQuestion(payload);
          setQuestions(
            questions.map((x) => (x._id === updated._id ? updated : x))
          );
          setEditing({ ...editing, [q._id]: false });
          return;
        }
      } else if (current.type === "TRUE_FALSE") {
        // ensure there's an explicit boolean (default to false)
        if (typeof current.correctBoolean === "undefined") {
          const payload = { ...current, correctBoolean: false };
          const updated = await client.updateQuestion(payload);
          setQuestions(
            questions.map((x) => (x._id === updated._id ? updated : x))
          );
          setEditing({ ...editing, [q._id]: false });
          return;
        }
      } else if (current.type === "FILL_IN_THE_BLANK") {
        if (!current.correctAnswers || !current.correctAnswers.length) {
          alert(
            "Please provide at least one correct answer for fill-in-the-blank questions."
          );
          return;
        }
      }

      const updated = await client.updateQuestion(current);
      setQuestions(questions.map((x) => (x._id === updated._id ? updated : x)));
      setEditing({ ...editing, [q._id]: false });
    } catch (err) {
      console.error(err);
    }
  };

  const removeQuestion = async (qidLocal: string) => {
    if (!confirm("Delete question?")) return;
    await client.deleteQuestion(qidLocal);
    setQuestions(questions.filter((q) => q._id !== qidLocal));
  };

  const updateChoice = (questionId: string, choiceId: string, patch: any) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q._id !== questionId) return q;
        return {
          ...q,
          choices: q.choices.map((c: any) =>
            c._id === choiceId ? { ...c, ...patch } : c
          ),
        };
      })
    );
  };

  return (
    <div>
      <h3>Questions</h3>
      <div className="mb-2">
        <Button onClick={addQuestion}>New Question</Button>
      </div>
      {questions.map((q) => (
        <div key={q._id} className="card mb-2 p-2">
          <div className="d-flex justify-content-between">
            <h5>{q.title}</h5>
            <div>
              <button
                className="btn btn-sm btn-outline-primary me-1"
                onClick={() =>
                  setEditing({ ...editing, [q._id]: !editing[q._id] })
                }
              >
                {editing[q._id] ? "Done" : "Edit"}
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeQuestion(q._id)}
              >
                Delete
              </button>
            </div>
          </div>
          {editing[q._id] ? (
            <div>
              <FormControl
                className="mb-2"
                value={q.title}
                onChange={(e) =>
                  setQuestions(
                    questions.map((x) =>
                      x._id === q._id ? { ...x, title: e.target.value } : x
                    )
                  )
                }
              />
              <FormControl
                as="textarea"
                rows={3}
                className="mb-2"
                value={q.questionText}
                onChange={(e) =>
                  setQuestions(
                    questions.map((x) =>
                      x._id === q._id
                        ? { ...x, questionText: e.target.value }
                        : x
                    )
                  )
                }
              />
              <div className="mb-2">
                <b>Choices</b>
                {q.choices &&
                  q.choices.map((c: any) => (
                    <div key={c._id} className="d-flex align-items-center mb-1">
                      <input
                        type="radio"
                        name={`correct-${q._id}`}
                        checked={c.isCorrect}
                        onChange={() =>
                          setQuestions(
                            questions.map((x) =>
                              x._id === q._id
                                ? {
                                    ...x,
                                    choices: x.choices.map((ch: any) => ({
                                      ...ch,
                                      isCorrect: ch._id === c._id,
                                    })),
                                  }
                                : x
                            )
                          )
                        }
                      />
                      <FormControl
                        className="ms-2"
                        value={c.text}
                        onChange={(e) =>
                          updateChoice(q._id, c._id, { text: e.target.value })
                        }
                      />
                      <button
                        className="btn btn-sm btn-outline-danger ms-2"
                        onClick={() =>
                          setQuestions(
                            questions.map((x) =>
                              x._id === q._id
                                ? {
                                    ...x,
                                    choices: x.choices.filter(
                                      (ch: any) => ch._id !== c._id
                                    ),
                                  }
                                : x
                            )
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                <div>
                  <button
                    className="btn btn-sm btn-outline-secondary mt-1"
                    onClick={() =>
                      setQuestions(
                        questions.map((x) =>
                          x._id === q._id
                            ? {
                                ...x,
                                choices: [...(x.choices || []), EmptyChoice()],
                              }
                            : x
                        )
                      )
                    }
                  >
                    Add Choice
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <Button onClick={() => saveQuestion(q)} className="me-2">
                  Save
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => setEditing({ ...editing, [q._id]: false })}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div dangerouslySetInnerHTML={{ __html: q.questionText || "" }} />
              <ul>
                {q.choices &&
                  q.choices.map((c: any) => (
                    <li key={c._id}>
                      {c.text} {c.isCorrect ? "(correct)" : ""}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
