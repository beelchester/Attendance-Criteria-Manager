import axios from "axios"
import { Subject } from "../types/Subject"


export async function addSubject(
    userId: String
){
    try {
        let res = await axios.post(`http://localhost:9000/subjects/create?user_id=${userId}`, {
            SubName: "English",
        TotalClasses : 12,
        AttendedClasses:11
        }
                        )
        return res.data
}
catch (err) {
        throw new Error('Add Subject failed');
}
}

export async function deleteSubject(
    userId: String,
    subId: String 
){
    try {
        let res = await axios.delete(`http://localhost:9000/subjects/delete?user_id=${userId}&sub_id=${subId}`)
        return res.data 
    }
    catch (err) {
        throw new Error('Delete Subject failed');
    }
}

export async function updateSubject(
    userId: String,
    subject: Subject){
        try {
            let res = await axios.patch(`http://localhost:9000/subjects/update?user_id=${userId}&sub_id=${subject.ID}`, {
                SubName: subject.SubName,
                TotalClasses : subject.TotalClasses,
                AttendedClasses:subject.AttendedClasses
            })
            return res.data
        }
        catch (err) {
            throw new Error('Update Subject failed');
        }
    }

export async function getSubjects(
    userId: String,
){
    await axios.get(`http://localhost:9000/subjects/get?user_id=${userId}`
    ).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}
