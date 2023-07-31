import ClientOnly from "../components/ClientOnly"
import SignupClient from "./SignupClient"

const Signup = () => {

    return (
        <div>
        <ClientOnly>
            <SignupClient/>
        </ClientOnly>
        </div>
    )
}

export default Signup
