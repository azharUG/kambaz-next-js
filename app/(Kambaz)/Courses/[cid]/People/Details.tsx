import { useEffect, useState } from "react";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as client from "../../../Account/client";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const [user, setUser] = useState<any>({});

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState("");
  const [roleSel, setRoleSel] = useState("");

  useEffect(() => {
    if (user) {
      setName(`${user.firstName || ""} ${user.lastName || ""}`.trim());
      setEmail(user.email || "");
      setRoleSel(user.role || "");
    }
  }, [user]);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role: roleSel };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </button>
      <div className="text-center mt-2">
        {" "}
        <FaUserCircle className="text-secondary me-2 fs-1" />{" "}
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <>
            <FormControl
              className="w-50 wd-edit-name mb-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            />

            <FormControl
              type="email"
              className="w-50 wd-edit-email mb-2"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <select
              value={roleSel}
              onChange={(e) => setRoleSel(e.target.value)}
              className="form-select w-50 mb-2"
            >
              <option value="">Select role</option>
              <option value="STUDENT">Students</option>
              <option value="TA">Assistants</option>
              <option value="FACULTY">Faculty</option>
              <option value="ADMIN">Administrators</option>
            </select>
          </>
        )}
      </div>
      <b>Roles:</b> <span className="wd-roles"> {user.role} </span> <br />
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>{" "}
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>{" "}
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span> <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        {" "}
        Delete{" "}
      </button>
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        {" "}
        Cancel{" "}
      </button>
    </div>
  );
}
