import { useRef } from "react";
import { Carousel } from "antd";
import "../SCSS/style.scss";
import banner_en_1 from "../../../assets/images/banner_en_1.avif";
import banner_en_2 from "../../../assets/images/banner_en_2.avif";
import banner_en_3 from "../../../assets/images/banner_en_3.avif";
import banner_hi_1 from "../../../assets/images/banner_hi_1.avif";
import banner_hi_2 from "../../../assets/images/banner_hi_2.avif";
import banner_hi_3 from "../../../assets/images/banner_hi_3.avif";
import { useTranslation } from "react-i18next";
import { sendEvent } from "../../../services/analytics-service";
import { CLICK, VIEW } from "../../../services/constants";
import { Helmet } from "react-helmet";

const CarouselBanner = () => {
  const { i18n } = useTranslation();
  const isUserSwiped = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });

  const banners = {
    en: [banner_en_1, banner_en_2, banner_en_3],
    hi: [banner_hi_1, banner_hi_2, banner_hi_3],
  };

  const bannersNames = ["MARKET_PLACE", "BUY_EV", "SELL_EV"];

  // fallback to English banners if language not found
  const selectedBanners = banners[i18n.language] || banners.en;

  const handleTouchStart = (e) => {
    const touch = e.touches?.[0];
    if (touch) {
      touchStart.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches?.[0];
    if (touch) {
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // horizontal swipe detected
        isUserSwiped.current = true;
      }
    }
  };

  const handleAfterChange = () => {
    if (isUserSwiped.current) {
      const eventBody = {
        flowContext: "HERO_BANNER_SCROLL",
        action: VIEW,
        source_page: window.location.pathname,
      };
      sendEvent(eventBody);
      isUserSwiped.current = false;
    }
  };

  const handleBannerClick = (position) => {
    const eventBody = {
      flowContext: `HERO_BANNER_CLICK`,
      action: CLICK,
      source_page: window.location.pathname,
      banner_name: bannersNames[position],
      banner_position: position + 1,
    };
    sendEvent(eventBody);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-delay="0"
      style={{
        marginTop: "16px",
        border: "none",
        background: "none",
        width: "100%",
        display: "block",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={() => (isUserSwiped.current = true)}
    >
      <Helmet>
        <link
          rel="preload"
          as="image"
          href={banners[i18n.language]?.[0] || banner_en_1}
          fetchpriority="high"
        />
      </Helmet>

      <Carousel
        draggable
        dotPosition="bottom"
        className="home_carousel"
        data-aos="fade-up"
        afterChange={handleAfterChange}
      >
        {selectedBanners.map((banner, index) => (
          <div
            className="home_carousel_banner"
            key={`banner${index + 1}`}
            onClick={() => handleBannerClick(index)}
          >
            <img
              src={banner}
              alt={`banner${index + 1}`}
              title={bannersNames[index]}
              width={328}
              height={437}
              fetchPriority={index === 0 ? "high" : "low"}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselBanner;
