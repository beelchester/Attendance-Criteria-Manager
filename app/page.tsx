'use client';

import axios from "axios"
import { useEffect, useState } from "react"

export default function Home() {

// async function signUp(){
//     await axios.post('http://localhost:9000/users/signup', {
//         email: "tt@tt.com",
//         Name: "tt",
//         password: "adsadadt"
//     }).then((res) => {
//         console.log(res)
//     }).catch((err) => {
//         console.log(err)
//     })
// }

type User = {
    Name: string,
    email: string,
    password: string
}

let initUser: User = {
    Name: "init",
    email: "",
    password: ""
}


let [user, setUser] = useState<User>(initUser)



async function login(){
    await axios.post('http://localhost:9000/users/login', {
        email: "tt@tt.com",
        password: "adsadadt"
    }).then((res) => {
        console.log(res)
        setUser(res.data)
    }).catch((err) => {
        console.log(err)
    })
}


useEffect(() => {
    // signUp()
    login()
    console.log(user)
}, [])
    

  return (
    <div>
        <h1>{user.Name}</h1>
    </div>
  )
}
