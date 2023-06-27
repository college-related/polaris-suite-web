import { PropsWithChildren } from "react"
import { bg } from "../assets/images"

interface IAuthenticationLayoutProps {}

const AuthenticationLayout = ({ children }: PropsWithChildren<IAuthenticationLayoutProps>) => {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-3 h-screen">
        <div className="bg-[#D1D4FF] px-8 py-6 min-w-fit w-full">
            {children}
        </div>
        <div className="flex-1 w-full hidden sm:col-span-2 sm:flex items-center justify-center">
            <img src={bg} alt="background image"  />
        </div>
    </main>
  )
}

export default AuthenticationLayout