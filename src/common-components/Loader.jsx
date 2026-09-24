import SyncLoader from "react-spinners/SyncLoader";
import "./SCSS/style.scss";

const Loader = ({ text, status = false }) => {
  return (
    <>
      <div
        className="loader"
        style={{ zIndex: "99999", display: status ? "flex" : "none" }}
      >
        <SyncLoader
          color="#7225f5"
          loading={true}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
          speedMultiplier={0.7}
        />

        <p className="alert mt-5">{text}</p>
      </div>
    </>
  );
};

export default Loader;
