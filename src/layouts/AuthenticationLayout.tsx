import { PropsWithChildren } from "react"
import { auth_illustration } from "../assets/images"
import { ArrowLeft } from "react-feather"
import { Link } from "react-router-dom"

interface IAuthenticationLayoutProps {}

const AuthenticationLayout = ({ children }: PropsWithChildren<IAuthenticationLayoutProps>) => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 h-screen">
      <div className="bg-primary_light px-8 py-6 min-w-fit w-full">
        <Link to="/"><ArrowLeft /></Link>
        {children}
      </div>
      <div className="flex-1 w-full hidden md:col-span-2 md:flex items-center justify-center">
        <img src={auth_illustration} alt="authentication flow illustration" />
      </div>
    </main>
  )
}

export default AuthenticationLayout