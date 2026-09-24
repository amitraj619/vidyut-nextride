import { useTranslation } from "react-i18next";
import PageWrapper from "../../common-components/PageWrapper";
import HeaderDesktop from "../../common-components/HeaderDesktop";
import FindMyEvVehiclesV2 from "./components/FindMyEvVehiclesV2";

const FindMyEvVehicleListPage = () => {
  const { t } = useTranslation();
  return (
    <div className="quiz_page">
      <PageWrapper>
        <HeaderDesktop
          header_name={t("FIND_MY_EV.QUIZ.TITLE")}
          show_location_btn={false}
          navigate_url="/"
        />
        <FindMyEvVehiclesV2 />
      </PageWrapper>
    </div>
  );
};

export default FindMyEvVehicleListPage;
