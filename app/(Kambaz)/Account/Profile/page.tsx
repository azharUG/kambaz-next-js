import Link from "next/link";
import { Form, FormControl, FormSelect, Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-3" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Profile</h3>

      <Form>
        {/* Username */}
        <FormControl
          className="mb-2"
          defaultValue="alice"
          placeholder="Username"
        />

        {/* Password */}
        <FormControl
          className="mb-2"
          defaultValue="123"
          type="password"
          placeholder="Password"
        />

        {/* First Name */}
        <FormControl
          className="mb-2"
          defaultValue="Alice"
          placeholder="First Name"
        />

        {/* Last Name */}
        <FormControl
          className="mb-2"
          defaultValue="Wonderland"
          placeholder="Last Name"
        />

        {/* Date of Birth */}
        <FormControl className="mb-2" type="date" defaultValue="2000-01-01" />

        {/* Email */}
        <FormControl
          className="mb-2"
          type="email"
          defaultValue="alice@wonderland.com"
          placeholder="Email"
        />

        {/* Role Select */}
        <FormSelect className="mb-3" defaultValue="FACULTY">
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </FormSelect>

        {/* Sign Out */}
        <Link href="/Account/Signin" passHref>
          <Button variant="danger" className="w-100">
            Signout
          </Button>
        </Link>
      </Form>
    </div>
  );
}
