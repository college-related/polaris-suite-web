import { useState } from "react"

const Dashboard = () => {
  const [user, setUser] = useState("Alson")

  return (
    <div className="p-5">
        <h1>Welcome, {user}</h1>

        <h3 className="mt-4">Here are your projects</h3>
    </div>
  )
}

export default Dashboard