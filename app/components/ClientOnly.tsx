'use client'
import {store} from '../store'
import { Provider } from "react-redux"
import NextAuthSessionProvider from "../providers/sessionProvider";

interface clientOnlyProps {
children: React.ReactNode
}

const ClientOnly:React.FC<clientOnlyProps> = ({children}) => {

    return (
            <Provider store={store}>
            <NextAuthSessionProvider>
            {children}
            </NextAuthSessionProvider>
            </Provider>
                )
}

export default ClientOnly

