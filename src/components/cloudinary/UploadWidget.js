import { useEffect, useRef } from "react";

export const UploadWidget = ({ onUploadSuccess, setAlt, setPublicId, disabled }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dnq0umskc",
        uploadPreset: "test_test",
        publicId: setPublicId,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const imageData = {
            url: result.info.secure_url,
            alt: setAlt,
            publicId: result.info.public_id,
          };
          onUploadSuccess(imageData);
        }
      }
    );
  }, [onUploadSuccess]);

  return (
    <button
      type="button"
      className={`btn-primary ${disabled ? "btn-primary-disabled" : ""}`}
      onClick={() => {
        if (!disabled) {
          widgetRef.current.open()
        }
      }}
    >
      Upload
    </button>
  );
};
