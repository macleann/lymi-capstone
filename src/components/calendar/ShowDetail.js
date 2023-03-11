import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AdvancedImage } from '@cloudinary/react';
import { CalendarContext } from "./CalendarProvider";
import { CldContext } from "../cloudinary/CloudinaryProvider";

export const ShowDetail = () => {
    const { getShowById } = useContext(CalendarContext)
    const { setImageAndWidth } = useContext(CldContext)
    const { showId } = useParams()
    const [show, setShow] = useState({})

    useEffect(() => {
        getShowById(showId)
            .then(res => setShow(res))
    }, [showId])

    const showPoster = setImageAndWidth(show?.image?.publicId, 250)

    return <>
        <h1>{show?.band?.name} at {show?.venue}</h1>
        <h2>Show's id: {show?.id}</h2>
        <div>
            {show?.date} at {show?.time}
        </div>
        <a href={`https://${show?.ticketLink}`}>Ticket Link</a>
        <div>
            <AdvancedImage cldImg={showPoster} />
        </div>
        </>
}