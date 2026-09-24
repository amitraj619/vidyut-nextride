import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";
import { Trans, useTranslation } from "react-i18next";

import "../SCSS/style.scss";
import { transformCustomerEnquiry } from "../../../utils/commonUtils";
import { submitCustomerEnquiry } from "../../../services/commonServices";
import { LoadingButton } from "../../LoadingButton";

const CustomerEnquiryInput = ({
  vehicleRegNumber,
  enquirySource,
  handleEnquirySubmitClick,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    agreed: false,
    vehicleRegNumber: vehicleRegNumber,
    enquirySource: enquirySource,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "contactNumber") {
      const numericValue = value.replace(/\D/g, "");

      setFormData((prev) => ({
        ...prev,
        contactNumber: numericValue,
      }));

      if (numericValue.length === 10) {
        const isValidPhone = /^[6-9]\d{9}$/.test(numericValue);

        setErrors((prev) => ({
          ...prev,
          contactNumber: isValidPhone
            ? ""
            : t("CUSTOMER_ENQUIRY.FORM.PHONE_INVALID"),
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          contactNumber: "",
        }));
      }
    }

    if (id === "customer_name") {
      let sanitizedNameValue = value.replace(/[^A-Za-z\s.]/g, "");

      sanitizedNameValue = sanitizedNameValue.replace(/\.{2,}/g, ".");

      setFormData((prev) => ({
        ...prev,
        name: sanitizedNameValue,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setLoading(true);

    const res = await submitCustomerEnquiry(transformCustomerEnquiry(formData));
    if (res?.status) {
      toast.success(t("CUSTOMER_ENQUIRY.FORM.SUCCESS"), {
        duration: 1000,
        className: "pe-1",
        cancel: { label: <RxCross2 className="fs-5" /> },
        cancelButtonStyle: {
          backgroundColor: "transparent",
          color: "#198775",
        },
      });

      handleEnquirySubmitClick();

      const newParams = new URLSearchParams(searchParams);
      newParams.set("customerName", formData?.name);
      setTimeout(() => {
        if (!window.location.pathname.endsWith("/thankyou")) {
          navigate(`thankyou?${newParams.toString()}`);
        }
        setLoading(false);
      }, 500);
    } else {
      toast.error(t("CUSTOMER_ENQUIRY.FORM.ERROR"), {
        duration: 1000,
        className: "pe-1",
        cancel: { label: <RxCross2 className="fs-5" /> },
        cancelButtonStyle: {
          backgroundColor: "transparent",
          color: "#DC464E",
        },
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const isNameValid = /^[A-Za-z\s'-]{2,}$/.test(formData.name.trim());
    const isPhoneValid = /^[6-9]\d{9}$/.test(formData.contactNumber);
    setIsFormValid(isNameValid && isPhoneValid);
  }, [formData]);

  return (
    <>
      <div className="input_container">
        <label htmlFor="customer_name" className="input_label">
          {t("CUSTOMER_ENQUIRY.FORM.NAME_LABEL")}{" "}
          <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="customer_name"
          className="input_field"
          placeholder={t("CUSTOMER_ENQUIRY.FORM.NAME_PLACEHOLDER")}
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="input_container">
        <label htmlFor="contactNumber" className="input_label">
          {t("CUSTOMER_ENQUIRY.FORM.PHONE_LABEL")}{" "}
          <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          pattern="[0-9]{10}"
          inputMode="numeric"
          id="contactNumber"
          className={`input_field ${errors.contactNumber ? "input_error" : ""}`}
          placeholder={t("CUSTOMER_ENQUIRY.FORM.PHONE_PLACEHOLDER")}
          value={formData.contactNumber}
          onChange={handleChange}
          maxLength={10}
          disabled={loading}
        />

        {errors.contactNumber && (
          <div className="input_error_text">{errors.contactNumber}</div>
        )}
      </div>

      <LoadingButton
        disable={!isFormValid || loading}
        hideSpin={!loading}
        onClick={handleSubmit}
        className={"btn primary_btn py-3"}
        styles={{
          opacity: isFormValid && !loading ? 1 : 0.6,
          cursor: isFormValid && !loading ? "pointer" : "not-allowed",
        }}
        text={t("CUSTOMER_ENQUIRY.FORM.BUTTON")}
      />

      <div className="terms_and_policy">
        <Trans
          i18nKey="CUSTOMER_ENQUIRY.FORM.TERMS_AGREEMENT"
          components={{
            1: (
              <span
                className="terms_and_policy_links"
                onClick={() =>
                  window.open("https://www.vidyuttech.com/terms/", "_blank")
                }
              />
            ),
            3: (
              <span
                className="terms_and_policy_links"
                onClick={() =>
                  window.open(
                    "https://www.vidyuttech.com/privacy-policy/",
                    "_blank",
                  )
                }
              />
            ),
          }}
        />
      </div>
    </>
  );
};

export default CustomerEnquiryInput;
