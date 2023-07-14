import Activities from "../../../components/Activities"
import { activities } from "../../../utils/data"

const ActivitiesTab = () => {
  return (
    <>
      <Activities activities={activities} />
    </>
  )
}

export default ActivitiesTab