"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { addAssignment } from "../reducer";

export default function AssignmentEditorNew() {
  const router = useRouter();
  const { cid } = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState<number | string>(100);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  function toIso(value: string | null) {
    if (!value) return null;
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d.toISOString();
  }

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      name,
      description,
      points: Number(points) || 0,
      dueDate: toIso(dueDate),
      availableFrom: toIso(availableFrom),
      availableUntil: toIso(availableUntil),
      course: cid,
    };

    dispatch(addAssignment(payload));
    router.push(`/Courses/${cid}/Assignments`);
  };

  const onCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignment-editor" className="p-3">
      <h4 className="fw-bold mb-4">Create Assignment</h4>

      <Form onSubmit={onSave}>
        <Row className="mb-3">
          <Col>
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={3}>
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) =>
                setPoints(e.target.value === "" ? "" : Number(e.target.value))
              }
              min={0}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={6}>
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="datetime-local"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </Col>
          <Col sm={6}>
            <Form.Label>Available Until</Form.Label>
            <Form.Control
              type="datetime-local"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="secondary" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button variant="danger" type="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
