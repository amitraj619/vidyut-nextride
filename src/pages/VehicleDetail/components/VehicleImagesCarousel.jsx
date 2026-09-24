import "../SCSS/style.scss";
import { Carousel, Skeleton } from "antd";
import GalleryCard from "./GalleryCard";
import {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { findFieldFromFetchedData } from "../../../utils/commonUtils";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { sendEvent } from "../../../services/analytics-service";
import { CLICK } from "../../../services/constants";
import { SmallSpinner } from "../../../common-components/CustomSpinners";
import { VehicleImageContext } from "../../../context/VehicleImageProvider";
import imagePlaceholder from "../../../assets/images/imagePlaceholder.png";

const VehicleImagesCarousel = ({
  image_data,
  vehicleId,
  registration_number,
  oem,
  vehicle_type,
  loading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All images");
  const [fullScreenGallery, setFullScreenGallery] = useState(false);
  const [hideGalleryCards, setHideGalleryCards] = useState(false);
  const [imageIndex, setImageIndex] = useState("");
  const [isDesktopView, setIsDesktopView] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isCategorySwitch, setIsCategorySwitch] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef();
  const scrollPosRef = useRef(0);

  const { vehicleImages, fetchAndStoreVehicleImages } =
    useContext(VehicleImageContext);

  const data = image_data?.childObjects?.[image_data?.fieldValue?.at(-1)];
  const rawCategories = useMemo(() => {
    const categories = {
      Exterior:
        findFieldFromFetchedData(data?.fields, "exteriorImages")?.fieldValue ||
        [],
      Interior:
        findFieldFromFetchedData(data?.fields, "interiorImages")?.fieldValue ||
        [],
      Mechanical:
        findFieldFromFetchedData(data?.fields, "mechanicalImages")
          ?.fieldValue || [],
      "Tyres & wheels":
        findFieldFromFetchedData(data?.fields, "tyresAndWheelsImages")
          ?.fieldValue || [],
    };

    categories["All images"] = Object?.values(categories)?.flat();

    return categories;
  }, [data]);

  const images = rawCategories[selectedCategory] || [];

  const handleGalleryView = (open) => {
    if (open) {
      scrollPosRef.current = window.scrollY;
    }

    setFullScreenGallery(open);
    setHideGalleryCards(false);

    if (!open) {
      if (window.history.state?.fullScreenGallery) {
        window.history.back();
      }
      setTimeout(() => {
        window.scrollTo({ top: scrollPosRef.current, behavior: "instant" });
      }, 10);
    }

    if (open) {
      const eventBody = {
        flowContext: `BUY_VEHICLE_GALLERY_OPEN`,
        action: CLICK,
        source_page: window.location.pathname,
        vehicleId,
        registration_number,
        oem_name: oem,
        vehicle_type,
      };
      sendEvent(eventBody);
    }
  };

  const toggleGalleryCards = (value = null) =>
    setHideGalleryCards(value ?? !hideGalleryCards);

  const handleSelectGallery = (category) => {
    setIsCategorySwitch(true);
    setSelectedCategory(category);

    // Reset carousel to first slide to ensure afterChange is fired
    setTimeout(() => {
      carouselRef.current?.goTo(0, false);
    }, 0);

    const eventBody = {
      flowContext: `BUY_VEHICLE_GALLERY_CATEGORY_SELECT`,
      action: CLICK,
      source_page: window.location.pathname,
      category_name: category,
      vehicleId,
      registration_number,
      oem_name: oem,
      vehicle_type,
    };
    sendEvent(eventBody);
  };

  const handleNavigateGallery = () => {
    if (isCategorySwitch) {
      setIsCategorySwitch(false);
    } else {
      const eventBody = {
        flowContext: `BUY_VEHICLE_GALLERY_NAVIGATE`,
        action: CLICK,
        source_page: window.location.pathname,
        vehicleId,
        registration_number,
        oem_name: oem,
        vehicle_type,
      };
      sendEvent(eventBody);
    }
  };

  const fetchMoreIfNeeded = useCallback(
    (currentIdx) => {
      if (!images || !images?.length) return;

      const total = images?.length;
      const range = 2;

      // Calculate circular indices
      const indicesToFetch = [];
      for (let i = -range; i <= range; i++) {
        const idx = (currentIdx + i + total) % total; // wrap around
        indicesToFetch?.push(idx);
      }

      // Collect IDs for those indices
      const idsToFetch = indicesToFetch
        ?.map((idx) => images[idx])
        ?.filter((id) => id && !vehicleImages[id]); // skip already fetched

      // Fetch only if something new
      if (idsToFetch.length > 0) {
        fetchAndStoreVehicleImages(vehicleId, idsToFetch);
      }
    },
    [images, vehicleImages],
  );

  useEffect(() => {
    const initialIds = [];

    // 3 images from Exterior
    const exteriorIds = rawCategories.Exterior?.slice(0, 3) || [];
    initialIds.push(...exteriorIds);

    // 1 image from other categories
    ["Interior", "Mechanical", "Tyres & wheels"]?.forEach((cat) => {
      const id = rawCategories[cat]?.[0];
      if (id) initialIds?.push(id);
    });

    fetchAndStoreVehicleImages(vehicleId, initialIds);
  }, [rawCategories]);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handlePopState = () => {
      setFullScreenGallery(false);
      setTimeout(() => {
        window.scrollTo({ top: scrollPosRef.current, behavior: "instant" });
      }, 10);
    };

    if (fullScreenGallery) {
      scrollPosRef.current = window.scrollY;
      document.body.classList.add("no-scroll");
      window.history.pushState({ fullScreenGallery: true }, "");
      window.addEventListener("popstate", handlePopState);
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("popstate", handlePopState);
    };
  }, [fullScreenGallery]);

  // Arrow keys navigation (desktop only)
  useEffect(() => {
    if (!fullScreenGallery || !isDesktopView) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") carouselRef.current?.prev();
      if (e.key === "ArrowRight") carouselRef.current?.next();
    };

    document?.activeElement?.blur();
    window?.addEventListener("keydown", handleKeyDown);
    return () => window?.removeEventListener("keydown", handleKeyDown);
  }, [fullScreenGallery, isDesktopView]);

  useEffect(() => {
    setIsDesktopView(sessionStorage.getItem("isDesktopViewEnable") === "true");
  }, []);

  useEffect(() => {
    if (images?.length > 0) setImageIndex(`1/${images?.length}`);
  }, [images]);

  useEffect(() => {
    if (!fullScreenGallery) return;

    const preventNavSwipe = (e) => {
      // If gesture is horizontal, block it
      if (
        Math.abs(
          e.touches[0].clientX -
            (e.touches[1]?.clientX || e.touches[0].clientX),
        ) > 0
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventNavSwipe, { passive: false });
    return () => document.removeEventListener("touchmove", preventNavSwipe);
  }, [fullScreenGallery, imageIndex]);

  return (
    <div
      className={`vehicle_images ${
        fullScreenGallery ? "full_screen_gallery_view" : ""
      }`}
    >
      <div
        className="vehicle_view_container"
        onClick={() => !fullScreenGallery && handleGalleryView(true)}
      >
        {fullScreenGallery && (
          <div className="gallery_full_screen_header">
            <span className="full_screen_image_count">{imageIndex}</span>
            <button
              className={`close_gallery_btn btn ${
                hideGalleryCards ? "d-none" : ""
              }`}
              onClick={() => handleGalleryView(false)}
            >
              X
            </button>
          </div>
        )}
        <Carousel
          draggable={!isZoomed}
          className="vehicle_img_carousel"
          dots={false}
          afterChange={(current) => {
            setImageIndex(`${current + 1}/${images?.length}`);
            setCurrentIndex(current);
            handleNavigateGallery();
            fetchMoreIfNeeded(current);
          }}
          ref={carouselRef}
          arrows={fullScreenGallery}
          slidesToShow={1}
          slidesToScroll={1}
          // Add these custom overrides below if styles are overridden by slick-injected stylesheets:
          prevArrow={
            <button
              className="slick-arrow slick-prev"
              aria-label="Previous"
            ></button>
          }
          nextArrow={
            <button
              className="slick-arrow slick-next"
              aria-label="Next"
            ></button>
          }
        >
          {loading || images?.length === 0 ? (
            <div className="vehicle_img">
              <Skeleton.Image active className="image_skeleton" />
            </div>
          ) : (
            images?.map((src, ind) => {
              const imageUrl = vehicleImages?.[src];

              return (
                <div
                  className="vehicle_img"
                  key={ind}
                  onClick={() => fullScreenGallery && toggleGalleryCards()}
                >
                  {ind === currentIndex ? (
                    <>
                      {fullScreenGallery ? (
                        <TransformWrapper
                          onZoomStop={({ state }) =>
                            setIsZoomed(state.scale > 1)
                          }
                          doubleClick={{ disabled: true }}
                          panning={{ disabled: !isZoomed }}
                          wheel={{ step: 50 }}
                          limitToBounds={true}
                        >
                          <TransformComponent
                            wrapperStyle={{ width: "100%", height: "100%" }}
                            contentStyle={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              className="inner_vehicle_img d-flex justify-content-center align-items-center"
                              style={{ width: "100%", height: "100%" }}
                            >
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={`vehicle_${ind + 1}`}
                                  onLoad={(e) => {
                                    e.target.style.opacity = 1;
                                  }}
                                  onError={(e) => {
                                    e.target.src = imagePlaceholder;
                                    e.target.style.opacity = 1;
                                  }}
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    width: "100%",
                                    objectFit: "contain",
                                    pointerEvents: isZoomed ? "auto" : "none",
                                    opacity: 0,
                                    transition: "opacity 0.4s ease-in-out",
                                  }}
                                />
                              ) : (
                                <SmallSpinner />
                              )}
                            </div>
                          </TransformComponent>
                        </TransformWrapper>
                      ) : imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={`vehicle_${ind + 1}`}
                          onLoad={(e) => {
                            e.target.style.opacity = 1;
                          }}
                          onError={(e) => {
                            e.target.src = imagePlaceholder;
                            e.target.style.opacity = 1;
                          }}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            width: "100%",
                            objectFit: "contain",
                            pointerEvents: isZoomed ? "auto" : "none",
                            opacity: 0,
                            transition: "opacity 0.4s ease-in-out",
                          }}
                        />
                      ) : (
                        <div className="inner_vehicle_img d-flex justify-content-center align-items-center">
                          <Skeleton.Image active className="image_skeleton" />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="inner_vehicle_img d-flex justify-content-center align-items-center">
                      <SmallSpinner />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </Carousel>
        {!fullScreenGallery && (
          <span className="image_counts">{imageIndex}</span>
        )}
      </div>

      <div
        className={`images_gallery_container ${
          fullScreenGallery && hideGalleryCards ? "hide" : ""
        }`}
        onClick={(e) => {
          if (fullScreenGallery) {
            e.stopPropagation(); // Prevents closing on click inside
            toggleGalleryCards(false);
          }
        }}
      >
        {[
          "All images",
          "Exterior",
          "Interior",
          "Mechanical",
          "Tyres & wheels",
        ].map((category) => {
          const urls = rawCategories?.[category] || [];
          return (
            <GalleryCard
              key={category}
              thumbnail={vehicleImages?.[urls[0]]}
              overlay_text={category}
              is_active={selectedCategory === category}
              handleGallery={() => handleSelectGallery(category)}
              show={rawCategories[category]?.length}
              loading={loading}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VehicleImagesCarousel;
