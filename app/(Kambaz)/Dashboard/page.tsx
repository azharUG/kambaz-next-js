"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { enroll, unenroll } from "../Courses/enrollmentsReducer";
import * as db from "../Database";
import { RootState } from "../store";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector((state: any) =>
    state.enrollmentsReducer ? state.enrollmentsReducer : { enrollments: [] }
  );
  const router = useRouter();

  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
          id="wd-update-course-click"
        >
          Update
        </button>
      </h5>
      <br />
      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        as="textarea"
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <div className="d-flex justify-content-end mb-2">
        <button
          className={`btn ${showAll ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowAll(!showAll)}
          id="wd-enrollments-toggle"
        >
          Enrollments
        </button>
      </div>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {(showAll
            ? courses
            : courses.filter((course: any) =>
                enrollments.some(
                  (enrollment: any) =>
                    enrollment.user === (currentUser as any)?._id &&
                    enrollment.course === course._id
                )
              )
          ).map((course: any, index: number) => (
            <Col
              key={index}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <div
                  role="button"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={() => {
                    // protect route: only allow navigation if enrolled
                    const isEnrolled = enrollments.some(
                      (enrollment: any) =>
                        enrollment.user === (currentUser as any)?._id &&
                        enrollment.course === course._id
                    );
                    if (isEnrolled) {
                      router.push(`/Courses/${course._id}/Home`);
                    }
                    // otherwise stay on dashboard (no navigation)
                  }}
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}{" "}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </CardText>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        // Go button should trigger navigation if enrolled; delegate to parent click
                        e.stopPropagation();
                        const isEnrolled = enrollments.some(
                          (enrollment: any) =>
                            enrollment.user === (currentUser as any)?._id &&
                            enrollment.course === course._id
                        );
                        if (isEnrolled) {
                          router.push(`/Courses/${course._id}/Home`);
                        }
                      }}
                    >
                      Go
                    </Button>

                    <Button
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        dispatch(deleteCourse(course._id));
                      }}
                      className="btn btn-danger float-end"
                      id="wd-delete-course-click"
                    >
                      Delete
                    </Button>
                    <Button
                      id="wd-edit-course-click"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </Button>

                    {/* Enroll / Unenroll button */}
                    {currentUser && (
                      <div className="mt-2">
                        {enrollments.some(
                          (enrollment: any) =>
                            enrollment.user === (currentUser as any)?._id &&
                            enrollment.course === course._id
                        ) ? (
                          <button
                            className="btn btn-danger"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              dispatch(
                                unenroll({
                                  user: (currentUser as any)._id,
                                  course: course._id,
                                })
                              );
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              dispatch(
                                enroll({
                                  user: (currentUser as any)._id,
                                  course: course._id,
                                })
                              );
                            }}
                          >
                            Enroll
                          </button>
                        )}
                      </div>
                    )}
                  </CardBody>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
