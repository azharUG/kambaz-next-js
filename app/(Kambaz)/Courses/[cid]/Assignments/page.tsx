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
import { FaTrash } from "react-icons/fa";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { deleteAssignment } from "./reducer";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();

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
            <ListGroupItem
              key={assignment._id}
              className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center"
            >
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
                    <strong>Due</strong>{" "}
                    {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    at 11:59pm | {assignment.points} pts
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <LessonControlButtons />
                <FaTrash
                  role="button"
                  className="text-danger ms-3"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to remove this assignment?"
                      )
                    ) {
                      dispatch(deleteAssignment(assignment._id));
                    }
                  }}
                />
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
