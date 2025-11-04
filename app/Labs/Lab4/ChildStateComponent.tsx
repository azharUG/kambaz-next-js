import { Button } from "react-bootstrap";

export default function ChildStateComponent({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: (counter: number) => void;
}) {
  return (
    <div id="wd-child-state">
      <h3>Counter {counter}</h3>
      <Button
        onClick={() => setCounter(counter + 1)}
        variant="success"
        id="wd-increment-child-state-click"
        className="me-2"
      >
        Increment
      </Button>
      <Button
        onClick={() => setCounter(counter - 1)}
        variant="danger"
        id="wd-decrement-child-state-click"
      >
        Decrement
      </Button>
    </div>
  );
}
