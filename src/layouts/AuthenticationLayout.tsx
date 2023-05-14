import React from "react"
import { bg } from "../assets/images"

interface AuthenticationLayoutProps {
    children: React.ReactNode,
}

const AuthenticationLayout = ({ children }: AuthenticationLayoutProps) => {
  return (
    <main className="flex h-screen">
        <div className="bg-[#D1D4FF] px-8 py-12 w-fit">
            {children}
        </div>
        <div className="flex-1 hidden xs:flex items-center justify-center">
            <img src={bg} alt="background image"  />
        </div>
    </main>
  )
}

export default AuthenticationLayout