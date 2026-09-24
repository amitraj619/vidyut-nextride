import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { HeaderNavSkeleton } from "./CommonSkeleton";

const purpleSpinner = (
  <LoadingOutlined
    style={{
      fontSize: 42,
      color: "#7225f5",
    }}
    spin
  />
);

const PageSkeleton = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#fff",
      }}
    >
      <HeaderNavSkeleton />

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "320px",
          }}
        >
          <Spin indicator={purpleSpinner} />

          <div
            style={{
              marginTop: "16px",
              fontSize: "18px",
              fontWeight: 600,
              color: "#7225f5",
            }}
          >
            Loading your data
          </div>

          <div
            style={{
              marginTop: "8px",
              color: "#925af1",
              fontSize: "14px",
              lineHeight: 1.5,
            }}
          >
            Please wait while we fetch the latest information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
