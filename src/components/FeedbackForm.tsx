import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value.substring(0, MAX_CHARACTERS));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAddToList(text);

    setText("");
  };

  const charCount = MAX_CHARACTERS - text.length;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
        value={text}
        onChange={handleChange}
      ></textarea>

      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company 🖊
      </label>

      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>SUBMIT</span>
        </button>
      </div>
    </form>
  );
}
