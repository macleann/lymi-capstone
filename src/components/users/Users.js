import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../auth/AuthProvider"

export const Users = () => {
    const { users, setUsers, getUsers } = useContext(AuthContext)

    useEffect(() => {
        getUsers()
            .then((res) => setUsers(res))
    }, [])

    return <>
        <ul>
        {
            users.map(user => {
                return <li key={`user--${user.id}`}>
                    <Link to={`/user/${user.id}/edit`}>{user.name}</Link>
                </li>
            })
        }
        </ul>
    </>
}