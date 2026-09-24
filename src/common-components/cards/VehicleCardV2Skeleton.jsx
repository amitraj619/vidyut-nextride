import React from "react";

const VehicleCardV2Skeleton = () => {
  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        background: "#fff",
        border: "1px solid #eee",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Image */}
      <div
        className="shimmer_effect"
        style={{
          height: "180px",
          width: "100%",
        }}
      />

      <div
        style={{
          padding: "14px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <div
          className="shimmer_effect"
          style={{
            width: "110px",
            height: "24px",
            borderRadius: "999px",
            marginBottom: "12px",
          }}
        />

        <div
          className="shimmer_effect"
          style={{
            height: "18px",
            width: "85%",
            borderRadius: "6px",
            marginBottom: "8px",
          }}
        />

        <div
          className="shimmer_effect"
          style={{
            height: "18px",
            width: "55%",
            borderRadius: "6px",
            marginBottom: "16px",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "18px",
          }}
        >
          <div
            className="shimmer_effect"
            style={{
              width: "35%",
              height: "12px",
              borderRadius: "6px",
            }}
          />

          <div
            className="shimmer_effect"
            style={{
              width: "35%",
              height: "12px",
              borderRadius: "6px",
            }}
          />
        </div>

        {/* EMI BOX */}
        <div
          style={{
            background: "#f9fafb",
            borderRadius: "10px",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
          }}
        >
          <div style={{ width: "60%" }}>
            <div
              className="shimmer_effect"
              style={{
                height: "10px",
                width: "60%",
                marginBottom: "8px",
              }}
            />

            <div
              className="shimmer_effect"
              style={{
                height: "14px",
                width: "80%",
              }}
            />
          </div>

          <div
            className="shimmer_effect"
            style={{
              width: "90px",
              height: "30px",
              borderRadius: "999px",
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #eee",
        }}
      >
        <div
          className="shimmer_effect"
          style={{
            flex: 1,
            height: "48px",
          }}
        />

        <div
          className="shimmer_effect"
          style={{
            flex: 1,
            height: "48px",
          }}
        />
      </div>
    </div>
  );
};

export default VehicleCardV2Skeleton;
