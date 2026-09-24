import { useState, useEffect } from "react";
import { toast } from "sonner";
import { login } from "vt-fe-core/auth";
import { LoadingButton } from "../../../common-components/LoadingButton";
import { getEnvConfig } from "../../../utils/EnvUtils";
import { RxCross2 } from "react-icons/rx";
import { truncateHttpErrorCode } from "../../../utils/commonUtils";
import { resale_channel } from "../../../services/constants";

const LoginEmailComp = ({ setEmail, email, setShowEmailComp }) => {
  const [errorEmail, setErrorEmail] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [hideSpinButton, setHideSpinButton] = useState(true);
  // const [email, setEmail] = useState("");

  const isEmail = (emailVal) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(emailVal);
  };

  // handles login via email
  const handleLogin = async () => {
    setDisableButton(true);
    setHideSpinButton(false);
    setErrorEmail(false);

    try {
      if (isEmail(email)) {
        let payload = {
          channel: resale_channel,
          authIdentifierType: "EMAIL",
          identifierValue: email,
        };
        const config = getEnvConfig();

        const data = await login(config, payload);

        if (!data?.status) {
          setErrorEmail(true);
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
          setShowEmailComp(false);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setDisableButton(false);
    setHideSpinButton(true);
  };

  const handleKeyDown = (e) => {
    if (!disableButton && e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    if (email?.includes(".com") && hideSpinButton) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [email, disableButton, hideSpinButton]);

  return (
    <>
      <label htmlFor="login-email" className="input-label mb-3">
        Enter email
      </label>
      <div className=" mb-3">
        <input
          type="email"
          placeholder="name@vidyuttech.com"
          className={`form-control email_input ${
            errorEmail ? "border-danger" : ""
          } `}
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="login-email"
          onKeyDown={handleKeyDown}
          disabled={!hideSpinButton}
        />
        {errorEmail && (
          <p className="text-danger">Please enter the valid email</p>
        )}
      </div>

      <LoadingButton
        disable={disableButton}
        text={"Send OTP"}
        hideSpin={hideSpinButton}
        onClick={handleLogin}
        className={"mt-2"}
      />
    </>
  );
};

export default LoginEmailComp;
