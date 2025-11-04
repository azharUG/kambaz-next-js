"use client";

import { Button } from "react-bootstrap";

const hello = () => {
  alert("Hello World!");
};
const lifeIs = (good: string) => {
  alert(`Life is ${good}`);
};
export default function ClickEvent() {
  return (
    <div id="wd-click-event">
      <h2>Click Event</h2>
      <Button onClick={hello} id="wd-hello-world-click" className="me-2">
        Hello World!
      </Button>
      <Button
        onClick={() => lifeIs("Good!")}
        id="wd-life-is-good-click"
        className="me-2"
      >
        Life is Good!
      </Button>
      <Button
        onClick={() => {
          hello();
          lifeIs("Great!");
        }}
        id="wd-life-is-great-click"
      >
        Life is Great!
      </Button>
      <hr />
    </div>
  );
}
