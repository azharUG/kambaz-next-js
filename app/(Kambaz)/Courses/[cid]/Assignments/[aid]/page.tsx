"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  FormLabel,
  FormControl,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaRegCalendarAlt } from "react-icons/fa";
import { updateAssignment } from "../reducer";
import * as client from "../client";

function isoToDateTimeLocal(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  // convert to local datetime-local string YYYY-MM-DDTHH:mm
  const tzOffset = d.getTimezoneOffset() * 60000;
  const local = new Date(d.getTime() - tzOffset);
  return local.toISOString().slice(0, 16);
}

function dateTimeLocalToIso(value: string | null | undefined) {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector((state: any) =>
    state.assignmentReducer ? state.assignmentReducer : { assignments: [] }
  );

  const assignment = assignments.find((a: any) => a._id === aid);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState<number | string>(100);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  useEffect(() => {
    if (assignment) {
      setName(assignment.title || "");
      setDescription(assignment.description || "");
      setPoints(assignment.points ?? 0);
      setDueDate(isoToDateTimeLocal(assignment.dueDate));
      setAvailableFrom(isoToDateTimeLocal(assignment.availableFrom));
      setAvailableUntil(isoToDateTimeLocal(assignment.availableUntil));
    }
  }, [assignment]);

  if (!assignment) {
    return <div className="p-3">Assignment not found.</div>;
  }

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: any = {
      ...assignment,
      title: name,
      description,
      points: Number(points) || 0,
      dueDate: dateTimeLocalToIso(dueDate),
      availableFrom: dateTimeLocalToIso(availableFrom),
      availableUntil: dateTimeLocalToIso(availableUntil),
    };

    (async () => {
      const saved = await client.updateAssignment(updated);
      dispatch(updateAssignment(saved));
      router.push(`/Courses/${cid}/Assignments`);
    })();
  };

  const onCancel = () => {
    router.push(`/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-3">
      {/* Assignment title header */}
      <h4 className="fw-bold mb-4">{assignment.title}</h4>

      <Form onSubmit={onSave}>
        {/* Assignment Name */}
        <Row className="mb-4">
          <FormLabel>Assignment Name</FormLabel>
          <FormControl
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Row>

        {/* Description */}
        <Row className="mb-4">
          <FormControl
            as="textarea"
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Row>

        {/* Points */}
        <Row className="mb-4">
          <FormLabel column sm={2} className="text-end">
            Points
          </FormLabel>
          <Col sm={10}>
            <FormControl
              type="number"
              value={points as any}
              onChange={(e) =>
                setPoints(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </Col>
        </Row>

        {/* Assign section */}
        <Row className="mb-4">
          <FormLabel column sm={2} className="text-end">
            Assign
          </FormLabel>
          <Col sm={10}>
            <div className="border p-3 rounded">
              <FormLabel className="fw-bold">Due</FormLabel>
              <InputGroup className="mb-3">
                <FormControl
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
                <InputGroupText>
                  <FaRegCalendarAlt />
                </InputGroupText>
              </InputGroup>

              <Row>
                <Col sm={6}>
                  <FormLabel className="fw-bold">Available from</FormLabel>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="datetime-local"
                      value={availableFrom}
                      onChange={(e) => setAvailableFrom(e.target.value)}
                    />
                    <InputGroupText>
                      <FaRegCalendarAlt />
                    </InputGroupText>
                  </InputGroup>
                </Col>
                <Col sm={6}>
                  <FormLabel className="fw-bold">Until</FormLabel>
                  <InputGroup className="mb-3">
                    <FormControl
                      type="datetime-local"
                      value={availableUntil}
                      onChange={(e) => setAvailableUntil(e.target.value)}
                    />
                    <InputGroupText>
                      <FaRegCalendarAlt />
                    </InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <hr />

        {/* Action Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-danger">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
