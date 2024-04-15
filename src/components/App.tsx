import { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";
import { type TFeedbackItem } from "../lib/types";

export default function App() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddToList = async (text: string) => {
    const company = text
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: company.substring(0, 1).toUpperCase(),
      company,
      text,
      daysAgo: 0,
    };

    setFeedbackItems([...feedbackItems, newItem]);
    setErrorMessage("");

    try {
      await fetch(
        "https://bytegrads.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );
    } catch (error) {
      //setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  const fetchFeedbackItems = async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://bytegrads.com/course-assets/projects/corpcomment/api/feedbacks"
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();

      setFeedbackItems(data.feedbacks);
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeedbackItems();
  }, []);

  return (
    <div className="app">
      <Footer />

      <Container
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />

      <HashtagList />
    </div>
  );
}
