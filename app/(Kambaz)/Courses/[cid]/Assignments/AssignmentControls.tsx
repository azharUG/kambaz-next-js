"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaSearch, FaPlus } from "react-icons/fa";

export default function AssignmentControls() {
  const { cid } = useParams();
  return (
    <div className="d-flex justify-content-between align-items-center mt-4 mb-4">
      <InputGroup className="w-auto">
        <InputGroupText className="bg-white border-end-0">
          <FaSearch className="text-secondary" />
        </InputGroupText>
        <FormControl
          type="text"
          placeholder="Search..."
          className="border-start-0"
        />
      </InputGroup>

      <div className="d-flex gap-2">
        <Button variant="light" className="border text-secondary">
          <FaPlus className="me-1" />
          Group
        </Button>
        <Link
          href={`/Courses/${cid}/Assignments/new`}
          className="text-decoration-none"
        >
          <Button variant="danger">
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </Link>
      </div>
    </div>
  );
}
