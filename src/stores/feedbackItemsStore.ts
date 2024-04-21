import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

export const useFeedbackItemsStore = create((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",

  getCompanyList: () => {
    /* return feedbackItems
    .map((item) => item.company)
    .filter((company, index, array) => {
      return array.indexOf(company) === index;
    }),*/

    const state = get();

    return state.feedbackItems
      .map((item) => item.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  },

  getFilteredFeedbackItems: () => {
    /* return selectedCompany
    ? feedbackItems.filter((item) => item.company === selectedCompany)
    : feedbackItems */

    const state = get();

    return state.selectedCompany
      ? state.feedbackItems.filter(
          (item) => item.company === state.selectedCompany
        )
      : state.feedbackItems;
  },

  addItemToList: async (text: string) => {
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

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

    //setErrorMessage("");
    set((state) => ({
      errorMessage: "",
    }));

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
      set((state) => ({
        errorMessage: "Something went wrong. Please try again later.",
      }));
    }
  },

  selectCompany: (company: string) => {
    /*setSelectedCompany((prev: string) => {
      if (prev === company) {
        return "";
      }
      return company;
    });*/

    set((state) => {
      if (state.selectedCompany === company) {
        return { selectedCompany: "" };
      }
      return { selectedCompany: company };
    });
  },

  fetchFeedbackItems: async () => {
    const fetchFeedbackItems = async () => {
      //setErrorMessage("");
      //setIsLoading(true);
      set((state) => ({ errorMessage: "" }));
      set((state) => ({ isLoading: true }));

      try {
        const response = await fetch(
          "https://bytegrads.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();

        //setFeedbackItems(data.feedbacks);
        set((state) => ({ feedbackItems: data.feedbacks }));
      } catch (error) {
        //setErrorMessage("Something went wrong. Please try again later.");
        set((state) => ({
          errorMessage: "Something went wrong. Please try again later.",
        }));
      }

      //setIsLoading(false);
      set((state) => ({ isLoading: false }));
    };
    fetchFeedbackItems();
  },
}));
