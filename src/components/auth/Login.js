import React, { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "./AuthProvider";

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { getUserForLogin } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return getUserForLogin(email, password)
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("lymi_user", JSON.stringify({
                        id: user.id,
                        isArtist: user.isArtist,
                        isAdmin: user.isAdmin
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Like You Mean It Records</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => setEmail(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                    <label htmlFor="password">Password:</label>
                    <input type="password" 
                    value={password}
                    onChange={evt => setPassword(evt.target.value)}
                    name="password" placeholder="Password" />
                </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a user yet?</Link>
            </section>
        </main>
    )
}