import { lazy, Suspense, useEffect } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { ErrorPage } from "../pages/Errors/ErrorPage";
import "../assets/SCSS/App.scss";
import HomePageSkeleton from "../common-components/skeletons/HomePageSkeleton";
import PageSkeleton from "../common-components/skeletons/PageSkeleton";
import BuySellPageSkeleton from "../common-components/skeletons/BuySellPageSkeleton";
import { useCleanupOverride } from "../customHooks/useCleanupOverride";

const HomePage = lazy(() => import("../pages/homePage/HomePage"));
const BuyUsedEV = lazy(() => import("../pages/BuyEV/BuyUsedEV"));
const SellUsedEV = lazy(() => import("../pages/SellEV/SellUsedEV"));
const ProtectedRoutes = lazy(
  () => import("../common-components/ProtectedRoutes"),
);
const DesktopVehicleListingPage = lazy(
  () => import("../pages/VehicleListing/DesktopVehicleListing"),
);
const LoginPage = lazy(() => import("../pages/Login/LoginPage"));
const VehicleDetailPageV2 = lazy(
  () => import("../pages/VehicleDetail/VehicleDetailPageV2"),
);
const CustomerEnquiryForm = lazy(
  () => import("../common-components/CustomerEnquiry/CustomerEnquiryForm"),
);
const FindMyEVQuiz = lazy(() => import("../pages/Quiz/FindMyEVQuiz"));
const FindMyEvVehicleListPage = lazy(
  () => import("../pages/Quiz/FindMyEvVehicleListPage"),
);
const PageNotFound = lazy(() => import("../pages/Errors/PageNotFound"));
const CatchAllWrapper = lazy(
  () => import("../common-components/CatchAllWrapper "),
);
const CustomerEnquiryFormSuccess = lazy(
  () =>
    import("../common-components/CustomerEnquiry/CustomerEnquiryFormSuccess"),
);

const LazyWrapper = (Component, Fallback = PageSkeleton) => (
  <Suspense fallback={<Fallback />}>
    <Component />
  </Suspense>
);

const GlobalLayout = () => {
  useCleanupOverride();

  useEffect(() => {
    let previous = window.location.href;

    const interval = setInterval(() => {
      if (window.location.href !== previous) {
        previous = window.location.href;
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return <Outlet />;
};

const vehicleDetailRoutes = [
  {
    path: ":vehicleId/details",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: LazyWrapper(VehicleDetailPageV2) },
      {
        path: ":vehicleRegNumber?/:oem_name?/:enquirySource/customer-enquiry",
        element: LazyWrapper(CustomerEnquiryForm),
        errorElement: <ErrorPage />,
      },
      {
        path: ":vehicleRegNumber?/:oem_name?/:enquirySource/customer-enquiry/thankyou",
        element: LazyWrapper(CustomerEnquiryFormSuccess),
        errorElement: <ErrorPage />,
      },
    ],
  },
];

const findMyEVRoutes = [
  { index: true, element: LazyWrapper(FindMyEVQuiz) },
  {
    path: "vehicles-list",
    children: [
      { index: true, element: LazyWrapper(FindMyEvVehicleListPage) },
      ...vehicleDetailRoutes,
    ],
  },
];

export const router = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: LazyWrapper(ProtectedRoutes),
        errorElement: LazyWrapper(PageNotFound),
        children: [
          {
            index: true,
            element: LazyWrapper(HomePage, HomePageSkeleton),
            errorElement: <ErrorPage />,
          },
          {
            path: "login",
            element: LazyWrapper(LoginPage),
            errorElement: <ErrorPage />,
          },

          { path: "find-my-perfect-ev", children: findMyEVRoutes },

          {
            path: "buy-used-ev",
            children: [
              {
                index: true,
                element: LazyWrapper(BuyUsedEV, BuySellPageSkeleton),
              },
              ...vehicleDetailRoutes,
              {
                path: "all-ev-vehicles",
                children: [
                  {
                    index: true,
                    element: LazyWrapper(DesktopVehicleListingPage),
                  },
                  ...vehicleDetailRoutes,
                ],
              },
              { path: "find-my-perfect-ev", children: findMyEVRoutes },
            ],
          },

          {
            path: "all-ev-vehicles",
            children: [
              { index: true, element: LazyWrapper(DesktopVehicleListingPage) },
              ...vehicleDetailRoutes,
            ],
          },

          {
            path: "sell-used-ev",
            children: [
              {
                index: true,
                element: LazyWrapper(SellUsedEV, BuySellPageSkeleton),
              },
              {
                path: ":enquirySource/customer-enquiry",
                element: LazyWrapper(CustomerEnquiryForm),
                errorElement: <ErrorPage />,
              },
              {
                path: ":enquirySource/customer-enquiry/thankyou",
                element: LazyWrapper(CustomerEnquiryFormSuccess),
                errorElement: <ErrorPage />,
              },
            ],
          },

          {
            path: "*",
            element: LazyWrapper(CatchAllWrapper),
            errorElement: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);
