import { File, HardDrive, Layers } from "react-feather"

import { useState } from "react"
import { getUser } from "../../helpers/cookie"

import DashboardTile from "../../components/DashboardTile"

const Dashboard = () => {
  const [user] = useState(getUser().name)

  return (
    <div className="p-5">
        <h1 className="mb-10">Welcome, {user}</h1>

        <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
          <DashboardTile title="Total Projects" value={5} icon={<HardDrive />} />
          <DashboardTile title="Total Reports" value={3} icon={<File />} />
          <DashboardTile title="Total Test Cases" value={30} icon={<Layers />} />
        </div>
    </div>
  )
}

export default Dashboard