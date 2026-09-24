import { useState, useEffect } from "react";
import "./SCSS/style.scss";
import LoginEmailComp from "./components/LoginEmailComp";
import VerifyOTPComp from "./components/VerifyOTPComp";
import { validateUser } from "../../services/validateUser";
import { useLocation, useNavigate } from "react-router-dom";
import waving_hand from "../../assets/images/waving_hand.webp";
import Loader from "../../common-components/Loader";
import { isUAT } from "../../utils/EnvUtils";
import PageWrapper from "../../common-components/PageWrapper";
import SEO from "../../common-components/SEO";
import { seoData } from "../../utils/dynamicSEOData";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [showEmailComp, setShowEmailComp] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkValidation = async () => {
    setLoading(true);
    const data = await validateUser();

    data?.status
      ? navigate({ pathname: "/", search: location.search }, { replace: true })
      : "";
    setLoading(false);
  };

  useEffect(() => {
    if (isUAT()) {
      checkValidation();
    } else {
      navigate({ pathname: "/", search: location.search }, { replace: true });
    }
  }, []);

  return (
    <PageWrapper>
      <SEO data={seoData.DEFAULT} />
      <div
        className="d-flex align-items-center justify-content-center flex-column login_container"
        style={{ height: "100vh" }}
      >
        <Loader text="Fetching data..." status={loading} />
        <div className=" login_inner_container">
          <img
            src="/new-vt-logo.svg"
            alt="vidyut_logo"
            width="49px"
            height="49px"
          />
          <div className="my-2 login_heading_container">
            <h2 className="login_page_heading">Welcome to </h2>
            <div className="login_page_heading d-flex">
              Nextride Platform
              <img
                src={waving_hand}
                className="ms-2"
                alt="hi icon"
                width="30px"
                height="30px"
              />
            </div>
          </div>

          <div className="login_input_container">
            {showEmailComp ? (
              <LoginEmailComp
                setEmail={setEmail}
                email={email}
                setShowEmailComp={setShowEmailComp}
              />
            ) : (
              <VerifyOTPComp
                email={email}
                setShowEmailComp={setShowEmailComp}
              />
            )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
