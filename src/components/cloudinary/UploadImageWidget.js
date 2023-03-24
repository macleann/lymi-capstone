import { useEffect, useRef } from "react";

export const UploadImageWidget = ({ onUploadSuccess, setAlt, setPublicId, disabled }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dnq0umskc",
        uploadPreset: "lymi_images",
        publicId: setPublicId,
        sources: ['local', 'url', 'google_drive', 'dropbox'],
        multiple: false,
        accept: "image/*"
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
