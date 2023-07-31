import { Subject } from "./Subject"

export type User = {
    ID : string,
    Name: string,
    Email: string,
    Password?: string
    Picture?: string,
    Subjects: Subject[],
    type?: string
}
