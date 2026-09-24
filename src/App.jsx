import "./assets/SCSS/App.scss";
import { useEffect, useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routings/appRoutes";
import { BigSpinner } from "./common-components/CustomSpinners";
import { AnimatePresence } from "framer-motion";
import { PageTransitionProvider } from "./context/PageTransitionContext";
import ProjectSchemaProvider, {
  ProjectSchemaContext,
} from "./context/ProjectSchemaProvider";
import { Toaster } from "sonner";
import {
  GeneralFilterProvider,
  BrandFilterProvider,
  QuizFilterProvider,
  EVsNearYouFilterProvider,
} from "./context/VehicleListProvider";
import LocationProvider from "./context/LocationContext";
import VehicleImageProvider from "./context/VehicleImageProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { pixelId } from "./services/constants";
import { initFacebookPixel, trackPageView } from "./utils/facebookPixelHelper";

function AppContent() {
  const { schema, fetchVehicleFieldSchema } = useContext(ProjectSchemaContext);

  // Fetch schema if not present
  useEffect(() => {
    if (!schema?.status) {
      fetchVehicleFieldSchema();
    }
  }, [schema?.status, fetchVehicleFieldSchema]);

  // LEGACY CLEANUP (Updated)
  useEffect(() => {
    // Clear the outdated session storage
    sessionStorage.removeItem("isDesktopViewEnable");
  }, []);

  // Init Facebook pixel
  useEffect(() => {
    const timeout = setTimeout(() => {
      initFacebookPixel(pixelId);
      trackPageView();
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {/* Replaced specific mobile/desktop wrappers with a standard Bootstrap-friendly container.
          Inline styles ensure it takes up the full viewport height. 
      */}
      <div>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{ className: "fs-6" }}
        />
        {/* Router automatically handles the home page and all sub-routes (including /dealer) */}
        <RouterProvider
          router={router}
          fallbackElement={<BigSpinner />}
          future={{ v7_startTransition: true }}
        />
      </div>
    </AnimatePresence>
  );
}

export default function App() {
  // Initialize animations
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      offset: 30,
    });
  }, []);

  return (
    <PageTransitionProvider>
      <ProjectSchemaProvider>
        <LocationProvider>
          <VehicleImageProvider>
            <GeneralFilterProvider>
              <EVsNearYouFilterProvider>
                <BrandFilterProvider>
                  <QuizFilterProvider>
                    <AppContent />
                  </QuizFilterProvider>
                </BrandFilterProvider>
              </EVsNearYouFilterProvider>
            </GeneralFilterProvider>
          </VehicleImageProvider>
        </LocationProvider>
      </ProjectSchemaProvider>
    </PageTransitionProvider>
  );
}
