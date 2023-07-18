import { useEffect, useState } from "react"

import { APICaller } from "../../../helpers/api"
import { getUser } from "../../../helpers/cookie"
import Activities from "../../../components/Activities"

interface IActivitiesProps {
  projectId: string;
  testcaseId?: string;
}

const ActivitiesTab = ({ projectId, testcaseId }: IActivitiesProps) => {
  const [activities, setActivities] = useState<Partial<Activity[]>>([])

  const fetchActivities = async () => {
    let url = `/activities/${projectId}`;

    if (testcaseId) {
      url = `/activities/${projectId}/${testcaseId}`;
    }

    const { data, statusCode, error } = await APICaller(url, "POST", { email: getUser().email, userId: getUser()._id });

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
    <>
      <Activities activities={activities} />
    </>
  )
}

export default ActivitiesTab