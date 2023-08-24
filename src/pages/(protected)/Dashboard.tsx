import { DownloadCloud, Edit3, File, HardDrive, Layers } from "react-feather"

import { useEffect, useState } from "react"
import { getUser } from "../../helpers/cookie"

import DashboardTile from "../../components/DashboardTile"
import IconButton from "../../components/IconButton"
import Activities from "../../components/Activities"
import { APICaller } from "../../helpers/api"
import { useModel } from "../../utils/hooks/useModel"
import ShortcutModel from "../../components/portal/ShortcutModel"
import { Link } from "react-router-dom"

const Dashboard = () => {
  const [user] = useState(getUser())
  const [dashboard, setDashboard] = useState<Dashboard>({
    projects: [],
    totalReports: 0,
    totalTestCases: 0,
    shortcuts: {
      userId: user._id,
      shortcuts: [],
    },
  })
  const [activities, setActivities] = useState<Partial<Activity[]>>([])
  const { closeModel, isModelOpen, openModel } = useModel();

  const fetchActivities = async () => {
    const { data, statusCode, error } = await APICaller("/activities", "POST", { email: user.email, userId: user._id });

    if (statusCode === 200) {
      setActivities(data.activities)
    } else {
      console.log(error)
    }
  }
  const fetchDashboardData = async () => {
    const { data, statusCode, error } = await APICaller(`/dashboard/${user._id}`, "GET");

    if (statusCode === 200) {
      setDashboard(data.dashboard);
    } else {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDashboardData();
    fetchActivities();
  }, [])

  return (
    <div className="p-5">
      <h3 className="mb-4 text-h3">Welcome, {user.name}</h3>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        <DashboardTile title="Total Projects" value={dashboard.projects.length} icon={<HardDrive />} />
        <DashboardTile title="Total Reports" value={dashboard.totalReports} icon={<File />} />
        <DashboardTile title="Total Test Cases" value={dashboard.totalTestCases} icon={<Layers />} />
      </div>

      <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
        <section>
          <h4 className="text-h4">Recent Activities</h4>
          <Activities activities={activities} />
        </section>
        <section>
          <div className="flex items-start justify-between">
            <h4 className="text-h4">Shortcuts</h4>
            <IconButton onClick={openModel} variant="clear" icon={<Edit3 className="w-5 h-5" />} />
          </div>
          {
            dashboard.shortcuts.shortcuts.length > 0 ? (
              <>
                {
                  dashboard.shortcuts?.shortcuts.map((shortcut, index) => (
                    <Link to={`/polaris/projects/${shortcut.project}`} key={index}>
                      <div className="flex gap-6 p-4 my-4 text-white rounded-md bg-deep_blue/95 hover:bg-deep_blue">
                        <DownloadCloud />
                        <h3>{shortcut.title}</h3>
                      </div>
                    </Link>
                  ))
                }
              </>
            ) : (
              <p className="text-center">No shortcuts yet.</p>
            )
          }
        </section>
      </div>
      {isModelOpen && (<ShortcutModel closeModel={closeModel} setDashboardShortcut={setDashboard} shortcuts={dashboard.shortcuts} projects={dashboard.projects} />)}
    </div>
  )
}

export default Dashboard