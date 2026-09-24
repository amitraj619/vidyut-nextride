import { useQuizQuestions } from "../../../utils/useQuizQuestions";

const QuestionStatusBar = ({ currentQuestionIndex }) => {
  const quizQuestions = useQuizQuestions();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      {quizQuestions?.map((ele, ind) => {
        const isCompleted = ele?.questionNumber < currentQuestionIndex;
        const isActive = ele?.questionNumber === currentQuestionIndex;

        return (
          <div
            key={ind}
            style={{
              flex: 1,
              height: "8px",
              borderRadius: "4px",
              background: isCompleted || isActive ? "#7225f5" : "#e2e2ec",
              opacity: isActive ? 1 : isCompleted ? 0.6 : 1,
              transition: "all 0.4s ease",
              transform: isActive ? "scaleY(1.2)" : "scaleY(1)",
            }}
          />
        );
      })}
    </div>
  );
};

export default QuestionStatusBar;
