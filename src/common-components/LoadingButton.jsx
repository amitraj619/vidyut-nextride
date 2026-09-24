import Spinner from "react-bootstrap/Spinner";
import "../pages/Login/SCSS/style.scss";

function LoadingButton({
  disable,
  text,
  hideSpin,
  onClick,
  className,
  icon,
  styles,
}) {
  return (
    <>
      <button
        className={`${className} btn login_button`}
        onClick={onClick}
        disabled={disable}
        type="button"
        style={{ width: "100%", cursor: "pointer", ...styles }}
      >
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          hidden={hideSpin}
        />
        &nbsp;
        <span className={icon && "d-flex align-items-center"}>
          {text}&nbsp;{icon}
        </span>
      </button>
    </>
  );
}

export { LoadingButton };
