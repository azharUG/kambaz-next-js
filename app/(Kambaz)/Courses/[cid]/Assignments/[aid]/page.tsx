export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <strong>Assignment Name</strong>
      </label>
      <br /> <br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br /> <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br /> <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>

        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </td>
        </tr>

        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="Percentage">Percentage</option>
              <option value="Decimal">Decimal</option>
              <option value="Fraction">Fraction</option>
            </select>
          </td>
        </tr>

        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="Online">Online</option>
              <option value="In-person">In-person</option>
            </select>
            <br /> <br />
            <label>Online Entry Options</label>
            <br />
            <input type="checkbox" name="check-entry" id="wd-text-entry" />
            <label htmlFor="wd-text-entry"> Text Entry</label>
            <br />
            <input type="checkbox" name="check-entry" id="wd-website-url" />
            <label htmlFor="wd-website-url"> Website URL</label>
            <br />
            <input
              type="checkbox"
              name="check-entry"
              id="wd-media-recordings"
            />
            <label htmlFor="wd-media-recordings"> Media Recordings</label>
            <br />
            <input
              type="checkbox"
              name="check-entry"
              id="wd-student-annotation"
            />
            <label htmlFor="wd-student-annotation"> Student Annotation</label>
            <br />
            <input type="checkbox" name="check-entry" id="wd-file-upload" />
            <label htmlFor="wd-file-upload"> File Uploads</label>
          </td>
        </tr>

        <br />

        <tr>
          <td align="right" valign="top">
            <label>Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label> <br />
            <input type="text" defaultValue={"Everyone"} id="wd-assign-to" />
            <br /> <br />
            <label htmlFor="wd-due-date">Due</label> <br />
            <input type="date" value="2024-05-13" id="wd-due-date" />
            <br /> <br />
            <table>
              <tr>
                <td>
                  <label htmlFor="wd-available-from">Available from</label>
                  <br />
                  <input
                    type="date"
                    value="2024-05-06"
                    id="wd-available-from"
                  />
                </td>
                <td>
                  <label htmlFor="wd-available-until">Until</label>
                  <br />
                  <input
                    type="date"
                    value="2024-05-20"
                    id="wd-available-until"
                  />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <hr />
      <div align="right">
        <button>Cancel</button> <button>Save</button>
      </div>
    </div>
  );
}
