import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1001" className="wd-dashboard-course-link">
            <Image src="/images/database.jpg" width={200} height={150} />
            <div>
              <h5> CS1001 Databases </h5>
              <p className="wd-dashboard-course-title">Database Design</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1002" className="wd-dashboard-course-link">
            <Image src="/images/cyber.jpg" width={200} height={150} />
            <div>
              <h5> CS1002 Cybersecurity </h5>
              <p className="wd-dashboard-course-title">
                Cyber Security Engineer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1003" className="wd-dashboard-course-link">
            <Image src="/images/game.jpg" width={200} height={150} />
            <div>
              <h5> CS1003 Game Development </h5>
              <p className="wd-dashboard-course-title">Game Developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1004" className="wd-dashboard-course-link">
            <Image src="/images/mine.jpg" width={200} height={150} />
            <div>
              <h5> CS1004 Minecraft Building </h5>
              <p className="wd-dashboard-course-title">
                Master Minecraft Builder
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1005" className="wd-dashboard-course-link">
            <Image src="/images/baki.jpg" width={200} height={150} />
            <div>
              <h5> CS1005 Gym for CS </h5>
              <p className="wd-dashboard-course-title">Gym Enjoyer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/1006" className="wd-dashboard-course-link">
            <Image src="/images/vibe.jpg" width={200} height={150} />
            <div>
              <h5> CS1006 Vibe Coding </h5>
              <p className="wd-dashboard-course-title">Master Vibe Coder</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
