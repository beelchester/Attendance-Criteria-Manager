import axios from "axios"
import { User } from "../types/User"


export async function login(email: string, password: string): Promise<User> {
    try {
        const response = await axios.post('http://localhost:9000/users/login', {
            email: email,
            password: password
        });
        return response.data;
    } catch (err) {
        throw new Error('Login failed. Please check your credentials and try again.');
    }
}


export async function signUp(
    name: string,
    email: string,
    password: string
){
    await axios.post('http://localhost:9000/users/signup', {
        Name: name,
        email: email,
        password: password
    }).then((res) => {
        return res.data
    }).catch((err) => {
        console.log(err)
    })
}
