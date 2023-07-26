'use client'
import { useState, useEffect } from "react"
import {store} from '../store'
import { Provider } from "react-redux"
import { User } from "../types/User"
import { login, signUp } from "../api/auth"
import { addSubject, deleteSubject, updateSubject } from "../api/subjects"
import { Subject } from "../types/Subject"

interface clientOnlyProps {
    children: React.ReactNode
    }

const ClientOnly:React.FC = () => {

let [user, setUser] = useState<User>()

let [name, setName] = useState<string>("")
let [email, setEmail] = useState<string>("")
let [password, setPassword] = useState<string>("")

    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }
console.log(user)

    async function apiHandler(query: string, subId?: string) {
        switch (query) {
            case "login": {
                              try {
                                  let res = await login(email, password)
                                      setUser(res)
                                      return
                              } 
                              catch (error) {
                                  throw error
                              }
                          }
            case "signup": {
                                try {
                                    await signUp(name, email, password)
                                    return
                                }
                                catch (error) {
                                    throw error
                                }
            }
            case "addSubject": {
                                    try {
                                        console.log("click")
                                        if (!user) return
                                            let res = await addSubject(user.UserID)
                                                setUser(
                                                       prev => {
                                                              if (!prev) return
                                                                    return {
                                                                        ...prev,
                                                                        Subjects: res.message
                                                                    }
                                                                }
                                                       )
                                                return
                                    }
                                    catch (error) {
                                        throw error
                                    }
            }
            case "deleteSubject": {
                                    try {
                                        if (!user) return
                                            else if (!subId) return
                                            let res = await deleteSubject(user.UserID,subId)
                                                setUser(
                                                       prev => {
                                                              if (!prev) return
                                                                    return {
                                                                        ...prev,
                                                                        Subjects: res.message
                                                                    }
                                                                }
                                                       )
                                                return
                                    }
                                    catch (error) {
                                        throw error
                                    }
                                    }
                case "addClass":{
                    try {
                        if (!user) return
                            let subject = user.Subjects.find((subject) => subject.SubID === subId)
                            if (!subject) return
                            subject.AttendedClasses += 1
                            let res = await updateSubject(user.UserID,subject)
                                                setUser(
                                                       prev => {
                                                              if (!prev) return
                                                                    return {
                                                                        ...prev,
                                                                        Subjects: res.message
                                                                    }
                                                                }
                                                       )
                                                return
                                   }
                                   catch (error) {
                                        throw error
                                    }
                }
                case "removeClass":{
                    try {
                        if (!user) return
                            let subject = user.Subjects.find((subject) => subject.SubID === subId)
                            if (!subject) return
                            subject.AttendedClasses -= 1
                            let res = await updateSubject(user.UserID,subject)
                                                setUser(
                                                       prev => {
                                                              if (!prev) return
                                                                    return {
                                                                        ...prev,
                                                                        Subjects: res.message
                                                                    }
                                                                }
                                                       )
                                                return
                                   }
                                   catch (error) {
                                        throw error
                                    }
                }
            default:
                break;
        }
    }

  return (
    <Provider store={store}>
{/* {children} */}
    <div>
<div>

<h1>Login</h1>
<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
<input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
<button onClick={() => apiHandler("login")}
>Login</button>


<h1>Signup</h1>
<input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
<input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
<input type="text" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
<button onClick={() => apiHandler("signup")}
>Signup</button>

<div>
<h1>Subjects</h1>
<button onClick={() => apiHandler("addSubject")}
>add subject</button>


    {user?.Subjects?.map((subject) => {
        return(
        <div key={subject.SubID}>
            <h1>{subject.SubName}</h1>
            <h2>{subject.TotalClasses}</h2>
            <h2>{subject.AttendedClasses}</h2>
            <button onClick={() => apiHandler("addClass", subject.SubID)}
            > add class </button>
            <button onClick={() => apiHandler("removeClass", subject.SubID)}
            > remove class </button>
            <button onClick={() => apiHandler("deleteSubject", subject.SubID)}
            >Delete Subject</button>
        </div>
              )
    })}

</div>


</div>

    </div>

    </Provider>
  )
}

export default ClientOnly

