import { GitHub } from "react-feather"
import Button from "../../components/Button"
import SettingTile from "../../components/settings/SettingTile"
import Select from "../../components/form/Select"

const SettingPage = () => {
  return (
    <main>
        <h1 className="mb-10">Settings</h1>
        <SettingTile title="Theme" description="Select your preffered theme">
            <Select 
                name=""
                label=""
                options={[
                    { name: "Dark Theme", value: "dark" },
                    { name: "Light Theme", value: "light" },
                    { name: "System Theme", value: "system" },
                ]}
                onChange={()=>{}}
            />
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