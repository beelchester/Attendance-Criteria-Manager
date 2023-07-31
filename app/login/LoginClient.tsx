"use client"

import { useEffect, useState } from "react"
import { googleLogin, login } from "../api/auth"
import { currentUser} from "../../features/currentUserSlice"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import jwt_decode from "jwt-decode"
import { GoogleUser } from "../types/GoogleLogin"
import { createLanguageServiceSourceFile } from "typescript"
import { useSession, signIn } from "next-auth/react"
import Auth from "../components/Auth"

const LoginClient = () => {
const [email, setEmail] = useState<string>("")
const [password, setPassword] = useState<string>("")

let dispatch = useDispatch()
let router = useRouter()

async function loginHandler(type?: string) {
        if (type === "google") {
            signIn("google",{
                        redirect:true,
                        callbackUrl:"/dashboard",
                    })
                     return
        }

    try {
        let res = await login(email, password)
            dispatch(currentUser(res))
            router.push("/dashboard")
    } 
    catch (error) {
        throw error
    }
}

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => loginHandler()}
            >Login</button>
            <button onClick={() => router.push("/signup")}>Signup</button>
            <br />
            <button onClick={() => loginHandler("google") }>Google</button>
            <br />
              <Auth />
</div>
    )
}

export default LoginClient
