import { useState } from "react"
import { getUser } from "../../helpers/cookie"

const Dashboard = () => {
  const [user] = useState(getUser().name)

  return (
    <div className="p-5">
        <h1>Welcome, {user}</h1>

        <h3 className="mt-4">This is dashboard</h3>
    </div>
  )
}

export default Dashboard