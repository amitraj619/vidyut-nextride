import { memo, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

import CommonBanner from "../../../common-components/CommonBanner";
import BuySellStepsCard from "../../../common-components/cards/BuySellStepsCard";
import {
  book_free_vehicle_icon,
  close_the_final_offer_icon,
  get_offer_price_within_4_hours_icon,
  payment_directly_in_your_account_icon,
} from "../../../assets/SVGIcons/SellStepsIcons";
import { purple_right_arrow_icon } from "../../../assets/SVGIcons/CommonIcons";
import sell_banner from "../../../assets/images/sell_banner.webp";
import { CLICK } from "../../../services/constants";
import { sendEvent } from "../../../services/analytics-service";

const SellEVBanner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const sellSteps = useMemo(
    () => [
      {
        icon: book_free_vehicle_icon,
        label: t("SELL_EV_SECTION.STEPS.0.TITLE"),
        isLastStep: false,
      },
      {
        icon: get_offer_price_within_4_hours_icon,
        label: t("SELL_EV_SECTION.STEPS.1.TITLE"),
        isLastStep: false,
      },
      {
        icon: close_the_final_offer_icon,
        label: t("SELL_EV_SECTION.STEPS.2.TITLE"),
        isLastStep: false,
      },
      {
        icon: payment_directly_in_your_account_icon,
        label: t("SELL_EV_SECTION.STEPS.3.TITLE"),
        isLastStep: true,
      },
    ],
    [t] // Recompute only when language changes
  );

  const handleClick = useCallback(() => {
    sendEvent({
      flowContext: "SELL_FREE_INSPECTION_CTA_CLICK",
      action: CLICK,
      source_page: window.location.pathname,
    });

    navigate({
      pathname: "FREE_INSPECTION/customer-enquiry",
      search: location.search,
    });
  }, [navigate, location.search]);

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={sell_banner}
          fetchpriority="high"
        />
      </Helmet>

      <CommonBanner
        banner_img={sell_banner}
        banner_text={t("SELL_EV_SECTION.TAGLINE")}
      >
        {sellSteps.map((step, index) => (
          <BuySellStepsCard
            key={step.label}
            step_icon={step.icon}
            step_label={step.label}
            is_last_step={step.isLastStep}
            fade_up_delay={(index + 1) * 100}
          />
        ))}

        <button
          className="btn secondary_btn full_width_btn"
          onClick={handleClick}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {t("SELL_EV_SECTION.CTA_BUTTON")}
          <span className="btn_arrow_icon">{purple_right_arrow_icon}</span>
        </button>
      </CommonBanner>
    </>
  );
};

SellEVBanner.displayName = "SellEVBanner";

export default memo(SellEVBanner);
