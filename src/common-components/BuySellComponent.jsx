import { sell_icon } from "../assets/SVGIcons/CommonIcons";
import { buy_icon } from "../assets/SVGIcons/CommonIcons";
import BuySellComponentCard from "./cards/BuySellComponentCard";
import "./SCSS/style.scss";
import { useTranslation } from "react-i18next";

const BuySellComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="buy_sell_component" data-aos="fade-up" data-aos-delay="100">
      <BuySellComponentCard
        icon={buy_icon}
        card_title="Buy"
        card_heading={t("ACTIONS.BUY.TITLE")}
        card_text={t("ACTIONS.BUY.SUB_TITLE")}
        navigate_url="/buy-used-ev"
      />
      <BuySellComponentCard
        icon={sell_icon}
        card_title="Sell"
        card_heading={t("ACTIONS.SELL.TITLE")}
        card_text={t("ACTIONS.SELL.SUB_TITLE")}
        navigate_url="/sell-used-ev"
      />
    </div>
  );
};

export default BuySellComponent;
