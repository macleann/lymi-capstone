import { AdvancedImage } from "@cloudinary/react"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { CldContext } from "../cloudinary/CloudinaryProvider"
import { RosterContext } from "./RosterProvider"

export const Roster = () => {
    const { bands, setBands, getBands } = useContext(RosterContext)
    const { setImageAndWidth } = useContext(CldContext)
    
    useEffect(() => {
        getBands()
            .then((res) => setBands(res))
    }, [])



    if (bands.length === 0) {
        return null
    }
    return <>
        {
            bands.map(band => {
                const bandImage = setImageAndWidth(band.image.publicId, 250)

                return (
                <div key={`band--${band.id}`}>
                    <Link to={`band/${band.id}`}>
                        <div><AdvancedImage cldImg={bandImage} /></div>
                        <div>{band.name}</div>
                    </Link>
                </div>
                )
            })
        }
    </>
}