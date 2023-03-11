import { useEffect, useRef } from "react";

export const UploadWidget = ({ onUploadSuccess }) => {
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    
    useEffect(() => {
      cloudinaryRef.current = window.cloudinary
      widgetRef.current = cloudinaryRef.current.createUploadWidget({
        cloudName: "dnq0umskc",
        uploadPreset: "test_test"
      }, (error, result) => {
          if (!error && result && result.event === "success") {
            const imageData = {
              url: result.info.secure_url,
              alt: `An image of ${result.info.original_filename}`,
              publicId: result.info.public_id
            }
            onUploadSuccess(imageData);
          }
      })
    },[onUploadSuccess])

    return (
      <button type="button" onClick={() => widgetRef.current.open()}>
        Upload
      </button>
    )
}