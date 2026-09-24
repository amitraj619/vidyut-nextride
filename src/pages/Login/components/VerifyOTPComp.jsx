import { useEffect, useState } from "react";
import { toast } from "sonner";
import OtpInput from "react-otp-input";
import { LoadingButton } from "../../../common-components/LoadingButton";
import { verifyOTP, login } from "vt-fe-core/auth";
import { setCookie } from "vt-fe-core/auth/cookieUtils";
import { MdOutlineEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { getEnvConfig } from "../../../utils/EnvUtils";
import { RxCross2 } from "react-icons/rx";
import { truncateHttpErrorCode } from "../../../utils/commonUtils";
import { resale_channel } from "../../../services/constants";

const VerifyOTPComp = ({ email, setShowEmailComp }) => {
  const [errorOTP, setErrorOTP] = useState(false);
  const [hideSpinButton, setHideSpinButton] = useState(true);
  const [otp, setOtp] = useState("");
  const [countdownTimerInSeconds, setCountdownTimerInSeconds] = useState(30);

  const navigate = useNavigate();
  const location = useLocation();

  const isButtonDisabled = otp.length !== 4 || !hideSpinButton;

  const submitHandle = async () => {
    if (!hideSpinButton || otp.length !== 4) return;

    setHideSpinButton(false);
    setErrorOTP(false);

    try {
      const config = getEnvConfig();
      let payload = {
        channel: resale_channel,
        authIdentifierType: "EMAIL",
        identifierValue: email,
        otp: otp,
      };

      const data = await verifyOTP(config, payload);

      if (!data?.status) {
        setOtp("");
        setErrorOTP(true);
        toast.error(truncateHttpErrorCode(data?.data?.message), {
          duration: 1000,
          className: "pe-1",
          cancel: { label: <RxCross2 className="fs-5" /> },
          cancelButtonStyle: {
            backgroundColor: "transparent",
            color: "#DC464E",
          },
        });
      } else {
        setCookie("vt_user_role", data?.data?.role, 30);
        setCookie("vt_user_email", email, 30);
        setCookie("vt_user_token", data?.data?.token, 30);
        setCookie("vt_user_referenceNum", data?.data?.referenceNum, 30);
        navigate({ pathname: "/", search: location.search }, { replace: true });
      }
    } catch (error) {
      console.log(error);
      setOtp("");
    } finally {
      setHideSpinButton(true);
    }
  };

  const handleKeyDown = (e) => {
    if (!isButtonDisabled && e.key === "Enter") {
      submitHandle();
    }
  };

  const resendOTP = async () => {
    try {
      let payload = {
        channel: resale_channel,
        authIdentifierType: "EMAIL",
        identifierValue: email,
      };
      const config = getEnvConfig();

      const data = await login(config, payload);

      if (data.status) {
        setCountdownTimerInSeconds(30);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (otp.length === 4) {
      submitHandle();
    }
  }, [otp]);

  useEffect(() => {
    if (countdownTimerInSeconds > 0) {
      const timer = setInterval(() => {
        setCountdownTimerInSeconds((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdownTimerInSeconds]);

  return (
    <>
      <label htmlFor="login-email" className="input-label mb-3">
        Please enter the OTP sent to{" "}
        <span style={{ color: "#7225f5" }}>{email}</span>{" "}
        <span style={{ cursor: "pointer" }}>
          {" "}
          <MdOutlineEdit onClick={() => setShowEmailComp(true)} />{" "}
        </span>
      </label>
      <div className=" mb-1">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={" "}
          inputStyle={`otp_input ${errorOTP ? "border-danger" : ""}`}
          shouldAutoFocus={true}
          inputType="tel"
          renderInput={(props) => (
            <input
              {...props}
              disabled={!hideSpinButton}
              onKeyDown={handleKeyDown}
            />
          )}
        />
        <div className="d-flex align-items-center">
          {errorOTP && <p className="text-danger mt-3">Input correct OTP</p>}

          {countdownTimerInSeconds > 0 ? (
            <p
              className="mt-3 ms-auto "
              style={{ cursor: "pointer", color: "#7225f5" }}
            >
              Resending OTP in : {countdownTimerInSeconds} secs
            </p>
          ) : (
            <p
              className="mt-3 ms-auto "
              style={{ cursor: "pointer", color: "#7225f5" }}
              onClick={resendOTP}
            >
              Resend OTP
            </p>
          )}
        </div>
      </div>

      <LoadingButton
        disable={isButtonDisabled}
        text={"Validate OTP"}
        hideSpin={hideSpinButton}
        onClick={submitHandle}
        className={""}
      />
    </>
  );
};

export default VerifyOTPComp;
