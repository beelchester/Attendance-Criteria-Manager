'use client'
import { useEffect } from "react"
import {RootState} from '../store'
import { useDispatch, useSelector } from "react-redux"
import { addSubject, deleteSubject, updateSubject } from "../api/subjects"
import { Subject } from "../types/Subject"
import { currentUser, updateCurrentUser } from "../../features/currentUserSlice"
import { User } from "../types/User"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const DashboardClient:React.FC = () => {

    const dispatch = useDispatch()
        const user:User = useSelector((state:RootState) => state.currentUser.value)
        console.log(user)

    let router = useRouter()

    async function apiHandler(query: string, subId?: string) {
        switch (query) {

            case "addSubject": {
                                   try {
                                       console.log("click")
                                           if (!user) return
                                               let res = await addSubject(user.ID)
                                                   dispatch(updateCurrentUser(res.message))
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
                                              let res = await deleteSubject(user.ID,subId)
                                                  dispatch(updateCurrentUser(res.message))
                                                  return
                                      }
                                      catch (error) {
                                          throw error
                                      }
                                  }
            case "addClass":{
                                try {
                                    if (!user) return
                                        let subject = user.Subjects.find((subject:Subject) => subject.ID === subId)
                                            if (!subject) return
                                                let newSub = {...subject}
                                    newSub.AttendedClasses += 1
                                        newSub.TotalClasses += 1
                                        let res = await updateSubject(user.ID,newSub)
                                        dispatch(updateCurrentUser(res.message))
                                        return
                                }
                                catch (error) {
                                    throw error
                                }
                            }
            case "removeClass":{
                                   try {
                                       if (!user) return
                                           let subject = user.Subjects.find((subject:Subject) => subject.ID === subId)
                                               if (!subject) return
                                                   let newSub = {...subject}
                                       newSub.TotalClasses += 1
                                           newSub.AttendedClasses -= 1
                                           let res = await updateSubject(user.ID,newSub)
                                           dispatch(updateCurrentUser(res.message))
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

    function logoutHandler() {
        dispatch(currentUser(null))
        if (typeof window !== "undefined"){
            localStorage.removeItem("currentUser")
        }
        router.push("/login")
    }

    {if (!user || !user.hasOwnProperty("ID")) return <div>loading</div>}
    return (
            <div>
            <div>
            <div>
            <h1>{user?.Name}</h1>
            <h1>Subjects</h1>
            <button onClick={() => apiHandler("addSubject")}
            >add subject</button>


            {user?.Subjects?.map((subject:Subject) => {
                    return(
                            <div key={subject.ID}>
                            <h1>{subject.SubName}</h1>
                            <h2>{subject.TotalClasses}</h2>
                            <h2>{subject.AttendedClasses}</h2>
                            <button onClick={() => apiHandler("addClass", subject.ID)}
                            > add class </button>
                            <button onClick={() => apiHandler("removeClass", subject.ID)}
                            > remove class </button>
                            <button onClick={() => apiHandler("deleteSubject", subject.ID)}
                            >Delete Subject</button>
                            </div>
                          )
                    })}
                    <button onClick={() => logoutHandler()}
                    >Log out</button>

            </div>
                </div>
                </div>
                )
}

export default DashboardClient
