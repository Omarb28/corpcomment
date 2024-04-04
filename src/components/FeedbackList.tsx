import { TriangleUpIcon } from "@radix-ui/react-icons";

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      <li className="feedback">
        <button>
          <TriangleUpIcon />
          <span>100</span>
        </button>

        <div>
          <p>B</p>
        </div>

        <div>
          <p>OmarCorp</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde iste
            obcaecati aspernatur fuga explicabo atque.
          </p>
        </div>

        <p>4d</p>
      </li>
    </ol>
  );
}
