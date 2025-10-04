import {
  Form,
  FormLabel,
  FormControl,
  FormSelect,
  FormCheck,
  Row,
  Col,
  Button,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        {/* Assignment Name */}
        <Row className="mb-3">
          <FormLabel column sm={2}>
            Assignment Name
          </FormLabel>
          <Col sm={10}>
            <FormControl type="text" defaultValue="A1 - ENV + HTML" />
          </Col>
        </Row>

        <Row className="mb-4">
          <Col sm={{ span: 10, offset: 2 }}>
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
          </Col>
        </Row>

        {/* Points */}
        <Row className="mb-3">
          <FormLabel column sm={2}>
            Points
          </FormLabel>
          <Col sm={4}>
            <FormControl type="number" defaultValue={100} />
          </Col>
        </Row>

        {/* Assignment Group */}
        <Row className="mb-3">
          <FormLabel column sm={2}>
            Assignment Group
          </FormLabel>
          <Col sm={4}>
            <FormSelect defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </FormSelect>
          </Col>
        </Row>

        {/* Display Grade As */}
        <Row className="mb-3">
          <FormLabel column sm={2}>
            Display Grade as
          </FormLabel>
          <Col sm={4}>
            <FormSelect defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="Decimal">Decimal</option>
              <option value="Fraction">Fraction</option>
            </FormSelect>
          </Col>
        </Row>

        {/* Submission Type - Boxed */}
        <Row className="mb-4">
          <FormLabel column sm={2}>
            Submission Type
          </FormLabel>
          <Col sm={10}>
            <div className="border p-3 rounded">
              <FormSelect className="mb-3" defaultValue="Online">
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
              </FormSelect>

              <FormLabel>Online Entry Options</FormLabel>
              <div>
                <FormCheck type="checkbox" label="Text Entry" />
                <FormCheck type="checkbox" label="Website URL" defaultChecked />
                <FormCheck type="checkbox" label="Media Recordings" />
                <FormCheck type="checkbox" label="Student Annotation" />
                <FormCheck type="checkbox" label="File Uploads" />
              </div>
            </div>
          </Col>
        </Row>

        {/* Assign - Boxed */}
        <Row className="mb-4">
          <FormLabel column sm={2}>
            Assign
          </FormLabel>
          <Col sm={10}>
            <div className="border p-3 rounded">
              <FormLabel>Assign to</FormLabel>
              <FormControl
                className="mb-3"
                type="text"
                defaultValue="Everyone"
              />

              <FormLabel>Due</FormLabel>
              <FormControl
                className="mb-3"
                type="datetime-local"
                defaultValue="2024-05-13T23:59"
              />

              <Row>
                <Col sm={6}>
                  <FormLabel>Available from</FormLabel>
                  <FormControl
                    type="datetime-local"
                    defaultValue="2024-05-06T00:00"
                  />
                </Col>
                <Col sm={6}>
                  <FormLabel>Until</FormLabel>
                  <FormControl
                    type="datetime-local"
                    defaultValue="2024-05-20T00:00"
                  />
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
