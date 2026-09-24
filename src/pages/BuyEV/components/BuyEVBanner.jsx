import { memo, useMemo } from "react";
import {
  choose_from_many_evs_icon,
  pay_by_cash_or_loan_icon,
  take_a_test_drive_icon,
  take_your_ev_delivery_icon,
} from "../../../assets/SVGIcons/BuyStepsIcons";
import buy_banner from "../../../assets/images/buy_banner.webp";
import CommonBanner from "../../../common-components/CommonBanner";
import BuySellStepsCard from "../../../common-components/cards/BuySellStepsCard";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const BuyEVBanner = () => {
  const { t } = useTranslation();

  const buySteps = useMemo(
    () => [
      {
        icon: choose_from_many_evs_icon,
        label: t("BUY_USED_EV.STEPS.STEP_1"),
      },
      {
        icon: pay_by_cash_or_loan_icon,
        label: t("BUY_USED_EV.STEPS.STEP_2"),
      },
      {
        icon: take_a_test_drive_icon,
        label: t("BUY_USED_EV.STEPS.STEP_3"),
      },
      {
        icon: take_your_ev_delivery_icon,
        label: t("BUY_USED_EV.STEPS.STEP_4"),
        isLastStep: true,
      },
    ],
    [t]
  );

  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href={buy_banner} fetchpriority="high" />
      </Helmet>
      <CommonBanner
        banner_img={buy_banner}
        banner_text={t("BUY_USED_EV.HEADER")}
      >
        {buySteps.map((step, index) => (
          <BuySellStepsCard
            key={index}
            step_icon={step.icon}
            step_label={step.label}
            is_last_step={step.isLastStep}
            fade_up_delay={`${(index + 1) * 100}`}
          />
        ))}
      </CommonBanner>
    </>
  );
};

BuyEVBanner.displayName = "BuyEVBanner";

export default memo(BuyEVBanner);
