import { useLayoutEffect, useRef, useState, memo } from "react";
import "./SCSS/style.scss";

const CommonBanner = ({ banner_img, banner_text, children }) => {
  const stepsRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (stepsRef.current) {
      const newHeight = stepsRef.current.clientHeight + 170; // buffer
      if (newHeight !== height) setHeight(newHeight);
    }
  }, [children, height]);

  return (
    <div
      className="common_banner_container"
      style={{ minHeight: `${height}px` }}
    >
      <div className="banner_inner_con">
        <div className="common_banner" data-aos="fade-up" data-aos-delay="0">
          <img
            src={banner_img}
            alt={`banner_${banner_text}`}
            title={banner_text}
            fetchPriority="high"
            loading="eager"
          />
          <div className="banner_shadow">
            <h3 className="banner_overlay_text">{banner_text}</h3>
          </div>
        </div>
        <div
          className="steps_container"
          ref={stepsRef}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="steps">{children}</div>
        </div>
      </div>
    </div>
  );
};

CommonBanner.displayname = "CommonBanner";

export default memo(CommonBanner);
