import "./SCSS/style.scss";
import thunder_logo from "../assets/images/thunder_logo.webp";
import { green_clock_icon } from "../assets/SVGIcons/CommonIcons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuizQuestions } from "../utils/useQuizQuestions";
import { useTranslation } from "react-i18next";
import { CLICK } from "../services/constants";
import { sendEvent } from "../services/analytics-service";

const FindMyEvSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const quizQuestions = useQuizQuestions();
  const [searchParams] = useSearchParams();

  const handleNavigate = () => {
    const eventBody = {
      flowContext: "EV_QUIZ_START",
      action: CLICK,
      source_page: window.location.pathname,
    };
    sendEvent(eventBody);
    navigate(`find-my-perfect-ev?${searchParams.toString()}`);
  };

  return (
    <div className="find_my_ev_section" data-aos="fade-up">
      <div className="find_my_ev_card">
        {/* top section */}
        <div className="top_section">
          <div className="section_heading">
            <span>
              {green_clock_icon} {t("FIND_MY_EV.QUIZ_DURATION")}
            </span>
            {t("FIND_MY_EV.TITLE")}
          </div>
          <div>
            <img
              src={thunder_logo}
              alt="Thunder Logo"
              title="Thunder Logo"
              loading="lazy"
              width={73}
              height={72}
            />
          </div>
        </div>

        <div className="bottom_section">
          <div className="bottom_text">
            {t("FIND_MY_EV.DESCRIPTION", { count: quizQuestions?.length || 0 })}
          </div>
          <button
            className="btn primary_btn find_my_ev_btn"
            onClick={handleNavigate}
          >
            {t("FIND_MY_EV.BUTTON")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindMyEvSection;
