import { RouterProvider } from "react-router-dom";
import "./SCSS/styleV2.scss";
import { BigSpinner } from "../../common-components/CustomSpinners";
import { router } from "../../routings/appRoutes";
import AOS from "aos";
import { useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";

const DesktopView = ({ handleExploreDesktopView }) => {
  useEffect(() => {
    const scrollContainer = document.querySelector("#mobileScrollContainer");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", () => {
        AOS.refresh();
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", AOS.refresh);
      }
    };
  }, []);

  return (
    <div className="desktopView">
      <button
        className="exit_desktop_view primary_btn btn"
        onClick={() => handleExploreDesktopView(false)}
      >
        Exit desktop view <MdOutlineLogout />
      </button>
      <div className="mobile-preview-container" id="mobileScrollContainer">
        <RouterProvider
          router={router}
          fallbackElement={<BigSpinner />}
          future={{ v7_startTransition: true }}
        />
      </div>
    </div>
  );
};

export default DesktopView;
