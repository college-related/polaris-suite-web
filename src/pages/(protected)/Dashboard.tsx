import { DownloadCloud, Edit3, File, HardDrive, Layers } from "react-feather"

import { useEffect, useState } from "react"
import { getUser } from "../../helpers/cookie"

import DashboardTile from "../../components/DashboardTile"
import IconButton from "../../components/IconButton"
import Activities from "../../components/Activities"
import { APICaller } from "../../helpers/api"

const Dashboard = () => {
  const [user] = useState(getUser().name)
  const [shortcuts, setShortcuts] = useState([
    { title: "Polaris Suite", icon: <DownloadCloud /> },
    { title: "E Guru", icon: <DownloadCloud /> },
    { title: "Rails", icon: <DownloadCloud /> },
  ]);
  const [activities, setActivities] = useState<Partial<Activity[]>>([])

  const fetchActivities = async () => {
    const { data, statusCode, error } = await APICaller("/activities", "POST", { email: getUser().email, userId: getUser()._id });

    if (statusCode === 200) {
      setActivities(data.activities)
    } else {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  return (
    <div className="p-5">
      <h3 className="text-h3 mb-4">Welcome, {user}</h3>

      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        <DashboardTile title="Total Projects" value={5} icon={<HardDrive />} />
        <DashboardTile title="Total Reports" value={3} icon={<File />} />
        <DashboardTile title="Total Test Cases" value={30} icon={<Layers />} />
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-8">
        <section>
          <h4 className="text-h4">Recent Activities</h4>
          <Activities activities={activities} />
        </section>
        <section>
          <div className="flex justify-between items-start">
            <h4 className="text-h4">Shortcuts</h4>
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