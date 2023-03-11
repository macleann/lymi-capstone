import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { createContext } from "react";

export const CldContext = createContext()

export const CloudinaryProvider = (props) => {
    
    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dnq0umskc'
        }
        });

    const setImageAndWidth = (image, width) => {
        // Instantiate a CloudinaryImage object for the image with the specified public ID.
        const myImage = cld.image(`${image}`); 

        // Resize specified width in pixels using the 'fill' crop mode.
        return myImage.resize(fill().width(width));
    }

    return <CldContext.Provider value={{cld, setImageAndWidth}}>
        {props.children}
    </CldContext.Provider>
}