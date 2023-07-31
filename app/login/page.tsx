import ClientOnly from "../components/ClientOnly"
import LoginClient from "./LoginClient"

const Login = () => {



    return (
        <div>
        <ClientOnly>
            <LoginClient/>
        </ClientOnly>
        </div>
    )
}

export default Login
