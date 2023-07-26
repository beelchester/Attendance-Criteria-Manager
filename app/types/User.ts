import { Subject } from "./Subject"

export type User = {
    UserID: string,
    Name: string,
    Email: string,
    Password: string
    Subjects: Subject[]
}
