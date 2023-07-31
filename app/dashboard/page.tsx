import ClientOnly from "../components/ClientOnly"
import DashboardClient from "./DashboardClient"

const Dashboard:React.FC = () => {

    return (
        <div>
        <ClientOnly>
            <DashboardClient/>
        </ClientOnly>
        </div>
                )
}

export default Dashboard



