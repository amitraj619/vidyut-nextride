import React from "react";

const CustomerCardV2 = ({
  customer_img_url,
  customer_name,
  customer_subtitle = "Nextride Second Hand EV Customer",
  customer_review,
  customer_highlight = "Resale confidence score: High",
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        background: "#ffffff",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #e8e8ed",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.03)";
      }}
    >
      {/* Top Image Section */}
      <div style={{ width: "100%", height: "240px", overflow: "hidden" }}>
        <img
          src={customer_img_url}
          alt={customer_name}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center", // Keeps faces in frame
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.03)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      {/* Bottom Content Section */}
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1, // Pushes the highlight strictly to the bottom
        }}
      >
        <h3
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#000000",
            marginBottom: "6px",
            marginTop: 0,
            lineHeight: "1.2",
          }}
        >
          {customer_name}
        </h3>

        {/* Subtitle (e.g., "Driver, Treo Plus Owner") */}
        <p
          style={{
            fontSize: "14px",
            color: "#888899",
            margin: "0 0 20px 0",
            fontWeight: "400",
          }}
        >
          {customer_subtitle}
        </p>

        {/* Main Review Text */}
        <p
          style={{
            fontSize: "15px",
            color: "#4a4a52",
            lineHeight: "1.6",
            margin: "0 0 24px 0",
            flexGrow: 1,
            // Keeps card heights perfectly uniform by clamping excessively long reviews
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {customer_review}
        </p>

        {/* Highlight Metric pinned to bottom */}
        {customer_highlight && (
          <div
            style={{
              marginTop: "auto",
              color: "#52369c", // Brand purple color matching your screenshot
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            {customer_highlight}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCardV2;
