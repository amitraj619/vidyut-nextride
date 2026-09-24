import { useState } from "react";
import QuestionComponent from "./components/QuestionComponent";
import QuestionStatusBar from "./components/QuestionStatusBar";
import { useLocation, useNavigate } from "react-router-dom";
import PageWrapper from "../../common-components/PageWrapper";
import { useQuizFilter } from "../../context/VehicleListProvider";
import { useTranslation } from "react-i18next";
import SEO from "../../common-components/SEO";
import { seoData } from "../../utils/dynamicSEOData";
import HeaderDesktop from "../../common-components/HeaderDesktop";

const FindMyEVQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const { applyNewFilters, appliedFilters } = useQuizFilter();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleQuizSubmit = (quizFilter) => {
    const updatedQuizFilter = {
      ...quizFilter,
      city: appliedFilters?.city || [],
    };

    sessionStorage.setItem(
      "appliedFindMyEvFilters",
      JSON.stringify(updatedQuizFilter),
    );
    applyNewFilters(updatedQuizFilter);
    navigate({ pathname: "vehicles-list", search: location.search });
  };

  const handleBackNavigation = () => {
    if (currentQuestionIndex > 0) {
      // Go to previous question
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    } else {
      // Exit quiz and return to main page
      const exitUrl =
        window.location.pathname?.split("find-my-perfect-ev")[0] || "/";
      navigate({ pathname: exitUrl, search: location.search });
    }
  };

  return (
    <div
      className="quiz_page"
      style={{
        backgroundColor: "#fcfcfd",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PageWrapper>
        <HeaderDesktop
          header_name={t("FIND_MY_EV.QUIZ.TITLE")}
          show_location_btn={false}
          onBackClick={handleBackNavigation}
        />
        <SEO data={seoData.FIND_MY_PERFECT_EV} />

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px 20px",
            maxWidth: "1000px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <QuestionStatusBar currentQuestionIndex={currentQuestionIndex} />

          <div style={{ width: "100%", marginTop: "40px" }}>
            <QuestionComponent
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              answers={answers}
              setAnswers={setAnswers}
              handleQuizSubmit={handleQuizSubmit}
            />
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default FindMyEVQuiz;
