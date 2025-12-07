"use client";

import { useEffect, useState } from "react";

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
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../Courses/reducer";
import {
  enroll,
  unenroll,
  setEnrollments,
} from "../Courses/enrollmentsReducer";
import { RootState } from "../store";
import { useRouter } from "next/navigation";
import * as client from "../Courses/client";
import * as enrollClient from "../Courses/enrollmentsClient";

export default function Dashboard() {
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector(
    (state: any) => state.enrollmentsReducer || { enrollments: [] }
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
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

  const fetchCourses = async () => {
    try {
      const list = showAll
        ? await client.fetchAllCourses()
        : await client.findMyCourses();
      dispatch(setCourses(list || []));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const list = await enrollClient.findEnrollmentsForCurrentUser();
      // server currently returns an array of Course objects for this endpoint
      // convert to enrollment-shaped objects { _id, user, course } expected by reducer
      if (
        Array.isArray(list) &&
        list.length > 0 &&
        list[0].course === undefined
      ) {
        const mapped = list.map((c: any) => ({
          _id: `${(currentUser as any)?._id}-${c._id}`,
          user: (currentUser as any)?._id,
          course: c._id,
        }));
        dispatch(setEnrollments(mapped));
      } else {
        dispatch(setEnrollments(list));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(courses.map((c: any) => (c._id === course._id ? course : c)))
    );
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) fetchEnrollments();
  }, [currentUser]);

  const handleEnroll = async (courseId: string) => {
    try {
      await client.enrollIntoCourse((currentUser as any)?._id, courseId);
      await fetchEnrollments();
      await fetchCourses();
    } catch (err) {
      console.error(err);
      // optimistic local fallback
      dispatch(enroll({ user: (currentUser as any)?._id, course: courseId }));
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      // Use the user-specific client endpoint so the server removes the enrollment
      await client.unenrollFromCourse((currentUser as any)?._id, courseId);
      await fetchEnrollments();
      await fetchCourses();
    } catch (err) {
      console.error(err);
      dispatch(unenroll({ user: (currentUser as any)?._id, course: courseId }));
    }
  };

  const visibleCourses = showAll
    ? courses
    : courses.filter((c: any) =>
        enrollments.some(
          (en: any) =>
            en.user === (currentUser as any)?._id && en.course === c._id
        )
      );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={onAddNewCourse}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={onUpdateCourse}
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
          onClick={async () => {
            const next = !showAll;
            setShowAll(next);
            try {
              const list = next
                ? await client.fetchAllCourses()
                : await client.findMyCourses();
              dispatch(setCourses(list || []));
            } catch (err) {
              console.error(err);
            }
          }}
          id="wd-enrollments-toggle"
        >
          Enrollments
        </button>
      </div>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course: any, index: number) => (
            <Col
              key={course._id || index}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <div
                  role="button"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={() => router.push(`/Courses/${course._id}/Home`)}
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>

                    <Button
                      variant="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/Courses/${course._id}/Home`);
                      }}
                    >
                      Go
                    </Button>

                    <Button
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onDeleteCourse(course._id);
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

                    {currentUser && (
                      <div className="mt-2">
                        {enrollments.some(
                          (en: any) =>
                            en.user === (currentUser as any)?._id &&
                            en.course === course._id
                        ) ? (
                          <button
                            className="btn btn-danger"
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              await handleUnenroll(course._id);
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success"
                            onClick={async (e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              await handleEnroll(course._id);
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
