import { HeaderNavSkeleton, ScrollingCardsSkeleton } from "./CommonSkeleton";

const HomePageSkeleton = () => {
  return (
    <>
      <style>
        {`
          .shimmer-box {
            background: #f6f7f8;
            background-image: linear-gradient(
              to right,
              #f6f7f8 0%,
              #edeef1 20%,
              #f6f7f8 40%,
              #f6f7f8 100%
            );
            background-repeat: no-repeat;
            background-size: 800px 100%;
            animation-duration: 1.5s;
            animation-fill-mode: forwards;
            animation-iteration-count: infinite;
            animation-name: placeholderShimmer;
            animation-timing-function: linear;
          }
          
          @keyframes placeholderShimmer {
            0% { background-position: -468px 0; }
            100% { background-position: 468px 0; }
          }
          
          @media (max-width: 991px) {
            .hero_skeleton_section {
              padding-top: 24px !important;
              padding-bottom: 32px !important;
            }
          }
          @media (min-width: 992px) {
            .hero_skeleton_section {
              min-height: 85vh;
            }
          }
        `}
      </style>

      <div className="page_wrapper_skeleton bg-white">
        <HeaderNavSkeleton />

        <section
          className="hero_skeleton_section w-100 bg-white"
          style={{
            padding: "48px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container">
            <div className="row align-items-center gy-4">
              <div className="col-12 col-lg-6 d-none d-lg-flex flex-column justify-content-center align-items-start gap-4 pe-lg-5">
                <div
                  className="shimmer-box"
                  style={{
                    width: "240px",
                    height: "36px",
                    borderRadius: "20px",
                  }}
                />

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    className="shimmer-box"
                    style={{
                      width: "85%",
                      height: "64px",
                      borderRadius: "12px",
                    }}
                  />
                  <div
                    className="shimmer-box"
                    style={{
                      width: "65%",
                      height: "64px",
                      borderRadius: "12px",
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    marginTop: "8px",
                  }}
                >
                  <div
                    className="shimmer-box"
                    style={{
                      width: "90%",
                      height: "18px",
                      borderRadius: "6px",
                    }}
                  />
                  <div
                    className="shimmer-box"
                    style={{
                      width: "85%",
                      height: "18px",
                      borderRadius: "6px",
                    }}
                  />
                  <div
                    className="shimmer-box"
                    style={{
                      width: "60%",
                      height: "18px",
                      borderRadius: "6px",
                    }}
                  />
                </div>

                <div className="d-flex align-items-center gap-3 mt-3 w-100">
                  <div
                    className="shimmer-box"
                    style={{
                      width: "200px",
                      height: "54px",
                      borderRadius: "30px",
                    }}
                  />
                  <div
                    className="shimmer-box"
                    style={{
                      width: "80px",
                      height: "40px",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>

              <div className="col-12 col-lg-6 d-flex flex-column align-items-center justify-content-center justify-content-lg-end gap-4">
                <div
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "#ffffff",
                    padding: "16px",
                    boxShadow: "0px 12px 35px rgba(0,0,0,0.08)",
                    border: "1px solid #f0f0f5",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    className="shimmer-box"
                    style={{
                      width: "100%",
                      height: "280px",
                      borderRadius: "16px",
                    }}
                  />

                  <div
                    style={{
                      background: "#ffffff",
                      borderRadius: "16px",
                      padding: "16px",
                      boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
                      border: "1px solid #f8f9fa",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                        }}
                      >
                        <div
                          className="shimmer-box"
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            flexShrink: 0,
                          }}
                        />

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            flex: 1,
                          }}
                        >
                          <div
                            className="shimmer-box"
                            style={{
                              width: "70%",
                              height: "16px",
                              borderRadius: "4px",
                            }}
                          />
                          <div
                            className="shimmer-box"
                            style={{
                              width: "40%",
                              height: "12px",
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-lg-none w-100" style={{ maxWidth: "500px" }}>
                  <div
                    className="shimmer-box w-100"
                    style={{ height: "56px", borderRadius: "30px" }}
                  />

                  <div className="d-flex justify-content-between align-items-center mt-3 px-2">
                    <div
                      className="shimmer-box"
                      style={{
                        width: "80px",
                        height: "40px",
                        borderRadius: "8px",
                      }}
                    />
                    <div
                      className="shimmer-box"
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div style={{ backgroundColor: "#f9f8fd", padding: "40px 0" }}>
          <div className="container">
            <ScrollingCardsSkeleton />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageSkeleton;
