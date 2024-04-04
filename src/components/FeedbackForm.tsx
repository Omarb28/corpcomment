export default function FeedbackForm() {
  return (
    <form className="form">
      <textarea
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
      ></textarea>

      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company 🖊
      </label>

      <div>
        <p className="u-italic">150</p>
        <button>
          <span>SUBMIT</span>
        </button>
      </div>
    </form>
  );
}
