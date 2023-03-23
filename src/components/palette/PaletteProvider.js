import { createContext, useState } from "react"

export const PaletteContext = createContext()

export const PaletteProvider = (props) => {
    const [colors, setColors] = useState([])

    const getColors = () => {
        return fetch(`http://localhost:8088/colors`)
            .then(response => response.json())
            .then(res => setColors(res))
    }

    return <PaletteContext.Provider value={{colors, getColors}}>
        {props.children}
    </PaletteContext.Provider>
}