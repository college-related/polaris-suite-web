import { Download, DownloadCloud, Edit3, File, HardDrive, Layers } from "react-feather"

import { useState } from "react"
import { getUser } from "../../helpers/cookie"

import DashboardTile from "../../components/DashboardTile"
import IconButton from "../../components/IconButton"

const Dashboard = () => {
  const [user] = useState(getUser().name)
  const [shortcuts, setShortcuts] = useState([
    { title: "Polaris Suite", icon: <DownloadCloud /> },
    { title: "E Guru", icon: <DownloadCloud /> },
    { title: "Rails", icon: <DownloadCloud /> },
  ]);

  return (
    <div className="p-5">
      <h1 className="mb-4">Welcome, {user}</h1>

      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        <DashboardTile title="Total Projects" value={5} icon={<HardDrive />} />
        <DashboardTile title="Total Reports" value={3} icon={<File />} />
        <DashboardTile title="Total Test Cases" value={30} icon={<Layers />} />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-8">
        <section>
          <h2>Recent Activities</h2>
          
        </section>
        <section>
          <div className="flex justify-between items-start">
            <h2>Shortcuts</h2>
            <IconButton onClick={()=>{}} variant="clear" icon={<Edit3 className="w-5 h-5" />} />
          </div>
          {
            shortcuts.length > 0 ? (
              <>
                {
                  shortcuts.map((shortcut, index) => (
                    <div className="bg-deep_blue p-4 rounded-md my-4 text-white flex gap-6" key={index}>
                      {shortcut.icon}
                      <h3>{shortcut.title}</h3>
                    </div>
                  ))
                }
              </>
            ) : (
              <p className="text-center">No shortcuts yet.</p>
            )
          }
        </section>
      </div>
    </div>
  )
}

export default Dashboard