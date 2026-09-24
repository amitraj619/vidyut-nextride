import { useTranslation } from "react-i18next";
import cargo_image from "../assets/images/quiz_cargo_vehicle.webp";
import passenger_image from "../assets/images/quiz_Passenger_vehicle.webp";

export const useQuizQuestions = () => {
  const { t } = useTranslation();

  return [
    {
      questionNumber: 0,
      question: t("FIND_MY_EV.QUIZ.QUESTIONS.QUESTION_1"),
      type: "image",
      fieldName: "vehicleType",
      options: [
        {
          label: t("FIND_MY_EV.QUIZ.QUESTIONS.OPTIONS.CARGO"),
          value: ["CARGO"],
          image: cargo_image,
        },
        {
          label: t("FIND_MY_EV.QUIZ.QUESTIONS.OPTIONS.PASSENGER"),
          value: ["PASSENGER"],
          image: passenger_image,
        },
      ],
    },
    {
      questionNumber: 1,
      question: t("FIND_MY_EV.QUIZ.QUESTIONS.QUESTION_2"),
      type: "text",
      fieldName: "targetSellingPrice",
      options: [
        {
          label: t("FIND_MY_EV.QUIZ.QUESTIONS.OPTIONS.BUDGET_1"),
          value: { lowerBound: 0, upperBound: 200000 },
        },
        {
          label: t("FIND_MY_EV.QUIZ.QUESTIONS.OPTIONS.BUDGET_2"),
          value: { lowerBound: 200000, upperBound: 300000 },
        },
        {
          label: t("FIND_MY_EV.QUIZ.QUESTIONS.OPTIONS.BUDGET_3"),
          value: { lowerBound: 300000, upperBound: 400000 },
        },
        {
          label: t("FIND_MY_EV.QUIZ.QUESTIONS.OPTIONS.BUDGET_4"),
          value: { lowerBound: 400000, upperBound: 100000000 },
        },
      ],
    },
    {
      questionNumber: 2,
      question: t("FIND_MY_EV.QUIZ.QUESTIONS.QUESTION_3"),
      type: "text",
      fieldName: "currentOdometer",
      options: [
        {
          label: t("FIND_MY_EV.QUIZ.QUESTIONS.OPTIONS.KMS_1"),
          value: { lowerBound: 0, upperBound: 25000 },
        },
        {
          label: t("FIND_MY_EV.QUIZ.QUESTIONS.OPTIONS.KMS_2"),
          value: { lowerBound: 25000, upperBound: 50000 },
        },
        {
          label: t("FIND_MY_EV.QUIZ.QUESTIONS.OPTIONS.KMS_3"),
          value: { lowerBound: 50000, upperBound: 75000 },
        },
        {
          label: t("FIND_MY_EV.QUIZ.QUESTIONS.OPTIONS.KMS_4"),
          value: { lowerBound: 75000, upperBound: 100000000 },
        },
      ],
    },
  ];
};
