import { AdvancedImage } from "@cloudinary/react"
import { useContext } from "react"
import { ReleaseContext } from "./ReleaseProvider"

export const ReleaseDetailSmall = ({release, releaseImage, band, checkIfInBand}) => {
    const { deleteRelease } = useContext(ReleaseContext)
    const deleteButton = (<button onClick={(evt) => {
        evt.preventDefault()
        deleteRelease(release.id)
    }}>Delete Release</button>)

    return <>
        <div key={`release--${release.id}`}>
            <AdvancedImage cldImg={releaseImage} />
            <div>{release.title}</div>
            <i>{release.releaseDate}</i>
        </div>
        {checkIfInBand(deleteButton)}
    </>
}