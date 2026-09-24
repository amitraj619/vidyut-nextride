import React from "react";

const VehicleDetailSkeletonV2 = () => {
  return (
    <div
      className="vehicle-detail-v2-skeleton"
      style={{
        backgroundColor: "#F8F9FA",
        minHeight: "100vh",
        paddingBottom: "100px",
      }}
    >
      {/* 1. Global Header Skeleton */}
      <div className="container py-3">
        <div className="d-flex align-items-center mb-3 placeholder-glow">
          <span
            className="placeholder rounded me-3"
            style={{ width: "24px", height: "24px" }}
          ></span>
          <span
            className="placeholder rounded col-4"
            style={{ height: "24px" }}
          ></span>
        </div>
      </div>

      <div className="container">
        <div className="row g-4 placeholder-glow">
          {/*  LEFT COLUMN  */}
          <div className="col-12 col-lg-7 col-xl-8">
            {/* Image Carousel Skeleton */}
            <div className="mb-4">
              <div
                className="bg-secondary bg-opacity-25 border rounded-4 mb-3 placeholder"
                style={{ height: "400px", width: "100%" }}
              />
              <div className="d-flex gap-3 overflow-hidden pb-2">
                {[...Array(4)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-secondary bg-opacity-25 rounded-3 placeholder"
                    style={{ width: "120px", height: "80px", flexShrink: 0 }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Mobile-Only Title & Tags Skeleton */}
            <div className="d-block d-lg-none mb-4">
              <span
                className="placeholder rounded col-8 mb-2"
                style={{ height: "32px" }}
              ></span>
              <div className="d-flex gap-2 mt-2">
                <span
                  className="placeholder rounded-pill col-3"
                  style={{ height: "32px" }}
                ></span>
                <span
                  className="placeholder rounded-pill col-2"
                  style={{ height: "32px" }}
                ></span>
              </div>
            </div>

            {/* Know Your EV Skeleton */}
            <div className="card shadow-sm border-0 mb-4 rounded-4">
              <div className="card-body p-4">
                <span
                  className="placeholder rounded col-3 mb-4 d-block"
                  style={{ height: "24px" }}
                ></span>
                <div className="row g-4">
                  {[...Array(9)].map((_, idx) => (
                    <div
                      key={idx}
                      className="col-6 col-md-4 d-flex align-items-start"
                    >
                      <div
                        className="me-3 bg-secondary bg-opacity-25 rounded-circle placeholder"
                        style={{ width: "40px", height: "40px", flexShrink: 0 }}
                      ></div>
                      <div className="w-100">
                        <span
                          className="placeholder rounded col-8 mb-1 d-block"
                          style={{ height: "12px" }}
                        ></span>
                        <span
                          className="placeholder rounded col-6 d-block"
                          style={{ height: "16px" }}
                        ></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inspection Report Skeleton */}
            <div className="mb-4">
              <span
                className="placeholder rounded col-4 mb-3 d-block"
                style={{ height: "24px" }}
              ></span>
              <div className="border rounded-4 overflow-hidden bg-white shadow-sm">
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`d-flex align-items-start p-3 ${idx !== 2 ? "border-bottom" : ""}`}
                  >
                    <div
                      className="me-3 bg-secondary bg-opacity-25 rounded-circle placeholder"
                      style={{ width: "24px", height: "24px" }}
                    ></div>
                    <div className="flex-grow-1">
                      <span
                        className="placeholder rounded col-5 mb-2 d-block"
                        style={{ height: "18px" }}
                      ></span>
                      <span
                        className="placeholder rounded col-9 mb-1 d-block"
                        style={{ height: "12px" }}
                      ></span>
                      <span
                        className="placeholder rounded col-7 d-block"
                        style={{ height: "12px" }}
                      ></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/*  RIGHT COLUMN  */}
          <div className="col-12 col-lg-5 col-xl-4">
            <div className="d-none d-lg-block mb-4">
              <span
                className="placeholder rounded col-9 mb-2 d-block"
                style={{ height: "36px" }}
              ></span>
              <div className="d-flex gap-2 mt-2">
                <span
                  className="placeholder rounded-pill col-3"
                  style={{ height: "32px" }}
                ></span>
                <span
                  className="placeholder rounded-pill col-2"
                  style={{ height: "32px" }}
                ></span>
              </div>
            </div>

            {/* Expert Audio Skeleton */}
            <div className="card shadow-sm border-0 mb-3 rounded-4">
              <div className="card-body p-4">
                <span
                  className="placeholder rounded col-5 mb-3 d-block"
                  style={{ height: "20px" }}
                ></span>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="bg-secondary bg-opacity-25 rounded-circle placeholder"
                    style={{ width: "48px", height: "48px" }}
                  ></div>
                  <div className="flex-grow-1">
                    <span
                      className="placeholder rounded w-100 mb-2 d-block"
                      style={{ height: "20px" }}
                    ></span>
                    <span
                      className="placeholder rounded col-3 d-block"
                      style={{ height: "12px" }}
                    ></span>
                  </div>
                </div>
                <span
                  className="placeholder rounded col-8 d-block"
                  style={{ height: "14px" }}
                ></span>
              </div>
            </div>

            {/* Location & Report Links Skeleton */}
            <div className="card shadow-sm border-0 mb-4 rounded-4">
              <div className="list-group list-group-flush rounded-4">
                <div className="list-group-item p-3 d-flex align-items-center gap-3 border-bottom">
                  <div
                    className="bg-secondary bg-opacity-25 rounded-circle placeholder"
                    style={{ width: "20px", height: "20px" }}
                  ></div>
                  <span
                    className="placeholder rounded col-6 d-block"
                    style={{ height: "16px" }}
                  ></span>
                </div>
                <div className="list-group-item p-3 d-flex justify-content-between align-items-center">
                  <div className="d-flex gap-3 align-items-center w-100">
                    <div
                      className="bg-secondary bg-opacity-25 rounded-circle placeholder"
                      style={{ width: "20px", height: "20px" }}
                    ></div>
                    <span
                      className="placeholder rounded col-7 d-block"
                      style={{ height: "16px" }}
                    ></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown Skeleton */}
            <div className="row g-3 mb-4">
              <div className="col-6">
                <div className="card shadow-sm border-0 h-100 rounded-4 d-flex flex-column align-items-center justify-content-center p-3">
                  <span
                    className="placeholder rounded col-6 mb-2 d-block"
                    style={{ height: "12px" }}
                  ></span>
                  <span
                    className="placeholder rounded col-8 d-block"
                    style={{ height: "24px" }}
                  ></span>
                </div>
              </div>
              <div className="col-6">
                <div className="card shadow-sm border-0 h-100 rounded-4 d-flex flex-column align-items-center justify-content-center p-3">
                  <span
                    className="placeholder rounded col-8 mb-2 d-block"
                    style={{ height: "12px" }}
                  ></span>
                  <span
                    className="placeholder rounded col-8 d-block"
                    style={{ height: "24px" }}
                  ></span>
                </div>
              </div>
            </div>

            {/* Desktop EMI & CTA Skeleton */}
            <div className="card shadow-sm border-0 rounded-4 d-none d-lg-block">
              <div className="card-body p-4">
                <span
                  className="placeholder rounded col-4 mb-2 d-block"
                  style={{ height: "14px" }}
                ></span>
                <span
                  className="placeholder rounded col-6 mb-4 d-block"
                  style={{ height: "32px" }}
                ></span>
                <div
                  className="placeholder rounded w-100"
                  style={{ height: "56px" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailSkeletonV2;
