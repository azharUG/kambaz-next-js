import {
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Row,
  Col,
  Button,
  InputGroup,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        {/* Assignment Name */}
        <Row className="mb-4">Assignment Name</Row>
        <Row className="mb-4">
          <FormControl type="text" defaultValue="A1 - ENV + HTML" />
        </Row>
        <Row className="mb-4">
          <FormControl
            as="textarea"
            rows={8}
            defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
          />
        </Row>

        {/* Points */}
        <Row className="mb-4">
          <FormLabel column sm={2} className="text-end">
            Points
          </FormLabel>
          <Col sm={10}>
            <FormControl type="number" defaultValue={100} />
          </Col>
        </Row>

        {/* Assignment Group */}
        <Row className="mb-4">
          <FormLabel column sm={2} className="text-end">
            Assignment Group
          </FormLabel>
          <Col sm={10}>
            <FormSelect defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>
          </Col>
        </Row>

        {/* Display Grade As */}
        <Row className="mb-4">
          <FormLabel column sm={2} className="text-end">
            Display Grade as
          </FormLabel>
          <Col sm={10}>
            <FormSelect defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Decimal">Decimal</option>
              <option value="Fraction">Fraction</option>
            </FormSelect>
          </Col>
        </Row>

        {/* Submission Type - Boxed */}
        <Row className="mb-4">
          <FormLabel column sm={2} className="text-end">
            Submission Type
          </FormLabel>
          <Col sm={10}>
            <div className="border p-3 rounded">
              <FormSelect className="mb-3" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
              </FormSelect>

              <FormLabel className="fw-bold">Online Entry Options</FormLabel>
              <div>
                <FormCheck
                  type="checkbox"
                  label="Text Entry"
                  className="mb-3"
                />
                <FormCheck
                  type="checkbox"
                  label="Website URL"
                  className="mb-3"
                  defaultChecked
                />
                <FormCheck
                  type="checkbox"
                  label="Media Recordings"
                  className="mb-3"
                />
                <FormCheck
                  type="checkbox"
                  label="Student Annotation"
                  className="mb-3"
                />
                <FormCheck
                  type="checkbox"
                  label="File Uploads"
                  className="mb-3"
                />
              </div>
            </div>
          </Col>
        </Row>

        {/* Assign - Boxed */}
        <Row className="mb-4">
          <FormLabel column sm={2} className="text-end">
            Assign
          </FormLabel>
          <Col sm={10}>
            <div className="border p-3 rounded">
              <FormLabel className="fw-bold">Assign to</FormLabel>
              <FormControl
                className="mb-3"
                type="text"
                defaultValue="Everyone"
              />

              <FormLabel className="fw-bold">Due</FormLabel>
              <InputGroup className="mb-3">
                <FormControl
                  type="datetime-local"
                  defaultValue="2024-05-13T23:59"
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
                      defaultValue="2024-05-06T00:00"
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
                      defaultValue="2024-05-20T00:00"
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
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
