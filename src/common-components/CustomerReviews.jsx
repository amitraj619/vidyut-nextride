import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import review_1 from "../assets/images/review_1.avif";
import review_2 from "../assets/images/review_2.png";
import review_3 from "../assets/images/review_3.avif";
import CustomerCard from "./cards/CustomerCard";

// Mapping user keys to corresponding images
const CUSTOMER_IMAGES = Object.freeze({
  USER1: review_1,
  USER2: review_2,
  USER3: review_3,
});

const CustomerReviews = () => {
  const { t } = useTranslation();

  const reviewData = useMemo(
    () => t("COSTUMER_REVIEWS", { returnObjects: true }),
    [t],
  );

  const reviews = useMemo(
    () =>
      Object.entries(CUSTOMER_IMAGES).map(([key, img]) => {
        const value = reviewData?.[key] || {};
        return {
          key,
          imgUrl: img,
          name: value.NAME,
          review: value.REVIEW,
          ratings: value.RATINGS,
        };
      }),
    [reviewData],
  );

  return (
    <section className="cards_section" data-aos="fade-up">
      <h2 className="section_header">{reviewData?.TITLE}</h2>

      <div className="scrolling_cards_container">
        {reviews.map(({ key, imgUrl, name, review, ratings }, index) => (
          <CustomerCard
            key={key}
            customer_img_url={imgUrl}
            customer_name={name}
            customer_ratings={ratings}
            customer_review={review}
            loading={index === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
