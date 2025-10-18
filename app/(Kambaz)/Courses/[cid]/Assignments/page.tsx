"use client";

import Link from "next/link";
import AssignmentControls from "./AssignmentControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import {
  BsCaretDownFill,
  BsGripVertical,
  BsPencilSquare,
  BsThreeDotsVertical,
} from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams } from "next/navigation";
import * as db from "../../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  return (
    <div id="wd-assignments">
      <AssignmentControls />

      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem
          id="wd-assignments-title"
          className="wd-title d-flex justify-content-between align-items-center p-3 ps-2 bg-light"
        >
          <div className="fw-bold d-flex align-items-center">
            <BsGripVertical className="fs-3" />
            <BsCaretDownFill className="me-1" />
            ASSIGNMENTS
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="border rounded-pill px-3 py-1 small text-muted">
              40% of Total
            </span>
            <FaPlus className="text-dark" />
            <BsThreeDotsVertical className="text-dark" />
          </div>
        </ListGroupItem>

        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any, index: number) => (
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center flex-grow-1 me-5">
                <BsGripVertical className="me-2 fs-3" />
                <BsPencilSquare className="me-4 text-success" />
                <div className="flex-grow-1">
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="text-dark text-decoration-none fw-bold wd-assignment-link"
                  >
                    {`A${index + 1} - ${assignment.title}`}
                  </Link>

                  <div>
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <strong>Not available until</strong> May 6 at 12:00am |{" "}
                    <strong>Due</strong> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <LessonControlButtons />
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
