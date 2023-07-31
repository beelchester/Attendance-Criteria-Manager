"use client"

import { useState } from "react"
import { signUp } from "../api/auth"
import {useRouter} from "next/navigation"
import Auth from "../components/Auth"
import { signIn } from "next-auth/react"

const SignupClient = () => {

const [name, setName] = useState<string>("")
const [email, setEmail] = useState<string>("")
const [password, setPassword] = useState<string>("")

let router = useRouter()

async function signupHandler() {

    try {
        await signUp(name, email, password)
        router.push("/login")
    } 
    catch (error) {
        throw error
    }
}

    return (
        <div>

            <h1>Signup</h1>
            <input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={() => signupHandler()}
            >Signup</button>
            <button onClick={() => router.push("/login")}>Login</button>
            <br />
            <button onClick={() => signIn("google")}>Google</button>
            <br />
              <Auth />
        </div>
    )
}

export default SignupClient
