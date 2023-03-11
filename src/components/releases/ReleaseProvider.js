import { createContext, useState } from "react";

export const ReleaseContext = createContext()

export const ReleaseProvider = (props) => {
    const [releases, setReleases] = useState([])

    const getReleases = () => {
        return fetch(`http://localhost:8088/releases?_expand=band`)
            .then(response => response.json())
    }

    const getReleasesByBandId = (bandId) => {
        return fetch(`http://localhost:8088/releases?bandId=${bandId}&_expand=band`)
            .then(response => response.json())
    }

    const postNewRelease = (release) => {
        return fetch(`http://localhost:8088/releases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(release)
        })
            .then(response => response.json())
    }

    const deleteRelease = (releaseId) => {
        return fetch(`http://localhost:8088/releases/${releaseId}`, {method: 'DELETE'})
    }

    return <ReleaseContext.Provider value={{releases, setReleases, getReleases, getReleasesByBandId, postNewRelease, deleteRelease}}>
        {props.children}
    </ReleaseContext.Provider>
}