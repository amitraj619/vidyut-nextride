import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Cards from "./cards/Cards";
import star_badge from "../assets/images/why_choose_nextride/Star-Badge--Streamline-Core.svg";
import car_battery from "../assets/images/why_choose_nextride/Car-Battery-Charging--Streamline-Core.svg";
import browser_check from "../assets/images/why_choose_nextride/Browser-Check--Streamline-Core.svg";
import search_visual from "../assets/images/why_choose_nextride/Search-Visual--Streamline-Core.svg";
import multiple_files from "../assets/images/why_choose_nextride/Multiple-File-2--Streamline-Core.svg";
import customer_support from "../assets/images/why_choose_nextride/Customer-Support-1--Streamline-Core.svg";
import rupee_bag from "../assets/images/why_choose_nextride/Bag-Rupee--Streamline-Core.svg";

const WhyChooseNextRide = ({ cardType = "general" }) => {
  const { t } = useTranslation();

  const cardConfigs = useMemo(
    () => ({
      QUALITY_CHECK: star_badge,
      BATTERY_REPORT: car_battery,
      WARRANTY: browser_check,
      INSPECTION: search_visual,
      RC_TRANSFER: multiple_files,
      SUPPORT: customer_support,
      BEST_PRICE: rupee_bag,
      HASSLE_FREE_DOCUMENTATION: multiple_files,
    }),
    []
  );

  const cardTypeMap = useMemo(
    () => ({
      buy: [
        "QUALITY_CHECK",
        "BATTERY_REPORT",
        "WARRANTY",
        "RC_TRANSFER",
        "SUPPORT",
      ],
      sell: ["INSPECTION", "BEST_PRICE", "HASSLE_FREE_DOCUMENTATION"],
      general: [
        "QUALITY_CHECK",
        "BATTERY_REPORT",
        "WARRANTY",
        "INSPECTION",
        "RC_TRANSFER",
        "SUPPORT",
        "BEST_PRICE",
      ],
    }),
    []
  );

  // Get the appropriate card list based on cardType
  const currentCardList = useMemo(() => {
    const keys = cardTypeMap[cardType] || cardTypeMap.general;
    return keys.map((key) => ({
      img: cardConfigs[key],
      name: t(`WHY_CHOOSE_NEXTRIDE.${key}`),
    }));
  }, [cardType, cardConfigs, cardTypeMap, t]);

  return (
    <div className="cards_section" data-aos="fade-up">
      <h2 className="section_header">{t("WHY_CHOOSE_NEXTRIDE.TITLE")}</h2>
      <div className="scrolling_cards_container">
        {currentCardList.map((card, i) => (
          <Cards
            key={card.name || i}
            card_img_url={card.img}
            text={card.name}
            width={40}
            height={40}
            fetchPriority="low"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default WhyChooseNextRide;
