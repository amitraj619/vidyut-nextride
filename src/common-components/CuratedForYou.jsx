import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import buy_ev_curated from "../assets/images/buy_ev_curated.avif";
import sell_ev_curated from "../assets/images/sell_ev_curated.avif";
import CuratedCard from "./cards/CuratedCard";

const CURATED_ASSETS = Object.freeze({
  BUYING_EV: {
    img: buy_ev_curated,
    link: "/buy-used-ev",
    defaultName: "Buy used EV",
  },
  SELLING_EV: {
    img: sell_ev_curated,
    link: "/sell-used-ev",
    defaultName: "Sell EV",
  },
});

const CuratedForYou = () => {
  const { t } = useTranslation();

  const curatedData = useMemo(
    () => t("CURATED_FOR_YOU", { returnObjects: true }),
    [t]
  );

  const curatedList = useMemo(
    () =>
      Object.entries(CURATED_ASSETS).map(([key, asset]) => {
        const value = curatedData?.[key] || {};
        return {
          key,
          imgUrl: asset.img,
          category: value.CATEGORY,
          name: value.HEADING,
          btnLabel: value.CTA,
          link: asset.link,
          ctaText: asset.defaultName,
        };
      }),
    [curatedData]
  );

  return (
    <section className="cards_section" data-aos="fade-up">
      <h2 className="section_header">{curatedData?.TITLE}</h2>

      <div className="scrolling_cards_container">
        {curatedList.map(
          ({ key, imgUrl, category, name, btnLabel, link, ctaText }, index) => (
            <CuratedCard
              key={key}
              curated_img_url={imgUrl}
              curated_category={category}
              curated_name={name}
              curated_btn_name={btnLabel}
              curated_link={link}
              curated_cta_text={ctaText}
              loading={index === 0 ? "eager" : "lazy"}
            />
          )
        )}
      </div>
    </section>
  );
};

export default CuratedForYou;
