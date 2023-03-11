import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { RosterContext } from "./RosterProvider"
import { CldContext } from "../cloudinary/CloudinaryProvider";
import { AdvancedImage } from "@cloudinary/react";
import { ReleaseContext } from "../releases/ReleaseProvider";
import { ReleaseDetailSmall } from "../releases/ReleaseDetailSmall";

export const BandDetail = () => {
    const { getBandById } = useContext(RosterContext)
    const { setImageAndWidth } = useContext(CldContext)
    const { releases, setReleases, getReleasesByBandId } = useContext(ReleaseContext)
    const [band, setBand] = useState({})
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getBandById(id)
            .then((res) => setBand(res))
        getReleasesByBandId(id)
            .then((res) => setReleases(res))
    }, [id, releases])

    const bandImage = setImageAndWidth(band?.image?.publicId, 500)

    //Only loads the Add Release button if the current user is an artist
    const checkIfArtistInBand = (button) => {
        const localLymiUser = localStorage.getItem("lymi_user")
        const lymiUserObject = JSON.parse(localLymiUser)

        if (lymiUserObject.isArtist) {
            if (band.artistBands.find(aB => aB.userId === lymiUserObject.id)) {
                return button
            }
        }
    }

    const AddReleaseButton = (<button onClick={(evt) => {
        evt.preventDefault()
        navigate("release/add")
    }}>Add Release</button>)

    if(!band.artistBands){
        return <p>Loading...</p>
    }
    return <>
        <h2>{band.name}</h2>
        <div>
            <AdvancedImage cldImg={bandImage} />
        </div>
        <div>
            {band.bio}
        </div>
        <div>
            {checkIfArtistInBand(AddReleaseButton)}
        {
            releases.map(release => {
                const releaseImage = setImageAndWidth(release?.image?.publicId, 250)
                return <ReleaseDetailSmall key={`release--${release.id}`} release={release} releaseImage={releaseImage} checkIfInBand={checkIfArtistInBand} />
            })
        }
        </div>
        
    </>
}