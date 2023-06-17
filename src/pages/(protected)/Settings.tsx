import { GitHub } from "react-feather"
import Button from "../../components/Button"
import SettingTile from "../../components/settings/SettingTile"

const SettingPage = () => {
  return (
    <main>
        <h1 className="mb-10">Settings</h1>
        <SettingTile title="Theme" description="Select your preffered theme">
            <select name="" id="">
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
                <option value="system">System Theme</option>
            </select>
        </SettingTile>
        <SettingTile title="Github" description="Link your github account">
            <>
                <Button variant="dark" onClick={()=>{}}>
                    <span className="flex items-center gap-2">
                        <GitHub /> Github
                    </span>
                </Button>
            </>
        </SettingTile>
    </main>
  )
}

export default SettingPage