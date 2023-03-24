import { useEffect, useRef } from "react";

export const UploadAudioWidget = ({ onUploadSuccess, setPublicId, disabled }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dnq0umskc",
        uploadPreset: "lymi_audio",
        publicId: setPublicId,
        sources: ['local', 'google_drive', 'dropbox'],
        acceptedFiles: "audio/*",
        multiple: false
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const audioData = {
            url: result.info.secure_url,
            publicId: result.info.public_id,
            duration: result.info.duration
          };
          onUploadSuccess(audioData);
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