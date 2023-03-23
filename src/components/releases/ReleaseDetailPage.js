import { AdvancedImage } from "@cloudinary/react"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CldContext } from "../cloudinary/CloudinaryProvider"
import { RosterContext } from "../roster/RosterProvider"
import { ReleaseContext } from "./ReleaseProvider"

export const ReleaseDetailPage = () => {
    const { getReleaseById } = useContext(ReleaseContext)
    const { getBandById } = useContext(RosterContext);
    const { setImageAndSize } = useContext(CldContext);
    const [band, setBand] = useState({});
    const [release, setRelease] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const {releaseId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getReleaseById(releaseId)
            .then(res => setRelease(res))
    }, [])

    useEffect(() => {
        if (release.id) {
            getBandById(release.bandId)
                .then((res) => setBand(res))
                .then(() => setIsLoading(false))
        }
    }, [release])

    const albumImage = setImageAndSize(release?.image?.publicId, 1000);

    // Only renders the parameter if the current user is an artist and is in the band or an admin
    const checkIfArtistInBand = (button) => {
        const localLymiUser = localStorage.getItem("lymi_user");
        const lymiUserObject = JSON.parse(localLymiUser);

        if (lymiUserObject?.isArtist) {
        if (band?.artistBands?.find((aB) => aB.userId === lymiUserObject?.id) || lymiUserObject?.isAdmin) {
            return button;
        }
        }
    };

    // The button to edit the release
    const EditReleaseButton = (
        <div className="flex justify-end mt-4 mr-4">
        <button
            className="btn-primary" 
            onClick={(evt) => {
            evt.preventDefault();
            navigate(`/roster/band/${release.bandId}/release/${release.id}/edit`);
            }}
        >
            Edit Release
        </button>
        </div>
    );

    if (isLoading) {
        return <p>Loading...</p>
    }
    return <>
        <div>
            {checkIfArtistInBand(EditReleaseButton)}
            <h2 className="mt-4 text-3xl text-center">{release.title}</h2>
            <div className="flex justify-center mt-4">
                <div className="w-1/2 pr-4 pl-8"><AdvancedImage cldImg={albumImage} /></div>
                <div className="w-1/2 flex-col justify-start pl-4 pr-8">

                </div>
            </div>
        </div>
        
    </>
}