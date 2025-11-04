"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      {links.map((link) => (
        <NavItem key={link} className="wd list-group fs-5 rounded-0">
          <NavLink
            as={Link}
            href={link}
            className={
              pathname.endsWith(link.toLowerCase())
                ? "list-group-item border-0 text-danger active"
                : "list-group-item border-0 text-danger"
            }
          >
            {link}
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}
