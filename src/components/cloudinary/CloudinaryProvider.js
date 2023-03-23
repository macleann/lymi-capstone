import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { createContext } from "react";

export const CldContext = createContext();

export const CloudinaryProvider = (props) => {
  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dnq0umskc",
    },
  });

  const setImageAndSize = (image, width, height) => {
    // Instantiate a CloudinaryImage object for the image with the specified public ID.
    const myImage = cld.image(`${image}`);

    // If height is specified
    if (height) {
      return myImage.resize(fill().width(width).height(height));
    }

    // Resize specified width in pixels using the 'fill' crop mode.
    return myImage.resize(fill().width(width));
  };

  return (
    <CldContext.Provider value={{ cld, setImageAndSize }}>
      {props.children}
    </CldContext.Provider>
  );
};
