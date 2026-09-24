import QuestionOptionCard from "./QuestionOptionCard";
import { useQuizQuestions } from "../../../utils/useQuizQuestions";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { sendEvent } from "../../../services/analytics-service";
import { CLICK } from "../../../services/constants";

const QuestionComponent = ({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  answers,
  setAnswers,
  handleQuizSubmit,
}) => {
  const quizQuestions = useQuizQuestions();
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    setFade(true);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (value) => {
    if (loading) return;
    setLoading(true);
    setFade(false);
    const updatedAnswers = {
      ...answers,
      [currentQuestion.fieldName]: value,
    };

    setAnswers(updatedAnswers);

    const eventBody = {
      flowContext: `EV_QUIZ_QUESTION${currentQuestionIndex + 1}_COMPLETE`,
      action: CLICK,
      source_page: window.location.pathname,
    };
    sendEvent(eventBody);

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleQuizSubmit(updatedAnswers);
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div
      className="container mx-auto"
      style={{
        opacity: fade ? 1 : 0,
        transform: fade ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        {/* Step Counter */}
        <div
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#888899",
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          {t("FIND_MY_EV.QUIZ.QUESTION_COUNT", {
            current: currentQuestion.questionNumber + 1,
            total: quizQuestions.length,
          })}
        </div>

        {/* Main Question */}

        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 36px)",
            fontWeight: 700,
            color: "#1a1a2e",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {currentQuestion.question}
        </h2>
      </div>

      {/* Grid of Options */}

      <div className="row justify-content-center">
        {currentQuestion.options.map((option) => (
          <div
            key={option.label}
            className="col-6 col-md-4 col-lg-3 p-2 d-flex"
          >
            <QuestionOptionCard
              option={option}
              isSelected={
                JSON.stringify(answers?.[currentQuestion.fieldName]) ===
                JSON.stringify(option.value)
              }
              onClick={() => handleOptionSelect(option.value)}
              disableOptions={loading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionComponent;
