import ClientOnly from "./components/ClientOnly"
import ClientRoot from "./components/ClientRoot"
export default function Home() {

  return (
    <ClientOnly>
        <ClientRoot/>
    </ClientOnly>
  )
}
