"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  const pathname = usePathname();
  const cid = pathname.split("/")[2];

  return (
    <div id="wd-courses-navigation" className="list-group wd fs-5 rounded-0">
      {links.map((link) => {
        const href = `/Courses/${cid}/${link}`;
        const isActive = pathname === href || pathname.startsWith(href + "/");

        return (
          <Link
            key={link}
            href={href}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={
              isActive
                ? "list-group-item active border-0"
                : "list-group-item text-danger border-0"
            }
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
