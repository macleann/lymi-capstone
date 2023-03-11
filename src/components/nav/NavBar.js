import { Link, useNavigate } from "react-router-dom"

export const NavBar = () => {
    const navigate = useNavigate()
    const localLymiUser = localStorage.getItem("lymi_user")
    const lymiUserObject = JSON.parse(localLymiUser)

    return (
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/calendar">Calendar</Link>
            </li>
            <li>
                <Link to="/roster">Roster</Link>
            </li>
            {
                lymiUserObject?.isAdmin
                ?
                <li>
                    <Link to="/users">Users</Link>
                </li>
                : ""
            }
            {
                localStorage.getItem("lymi_user")
                ?
                <li>
                    <Link to="" onClick={() => {
                        localStorage.removeItem("lymi_user")
                        navigate("/", {replace: true})
                    }}>Logout</Link>
                </li>
                :
                <li>
                    <Link to="/login">Login</Link>
                </li>
            }
        </ul>
    )
}