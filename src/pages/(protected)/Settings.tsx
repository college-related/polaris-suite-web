import { useEffect, useState } from "react";
import { Edit2, GitHub } from "react-feather";

import Button from "../../components/Button";
import SettingTile from "../../components/settings/SettingTile";
import Select from "../../components/form/Select";
import { APICaller } from "../../helpers/api";
import { addSettings, getSettings, getUser } from "../../helpers/cookie";

const SettingPage = () => {

  const [settings, setSettings] = useState<Partial<Settings>>({
    theme: "system",
    github: {
      enabled: false,
      username: "",
      token: "",
      repos: [],
    },
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const updateSettings = async () => {

    let toSendSettings: Partial<Settings> = {
      theme: settings.theme,
    };

    if(settings.github?.enabled) {
      toSendSettings.github = {
        enabled: true,
        username: settings.github.username,
        token: settings.github.token,
        repos: settings.github.repos,
      }
    }

    const { statusCode, data, error } = await APICaller(`/settings/${getUser()._id}`, "PUT", toSendSettings);

    setIsUpdating(true);

    if(statusCode === 200) {
      setSettings(data.setting);
      addSettings(data.setting);
    } else {
      console.log(error);
    }

    setIsUpdating(false);
  }

  useEffect(() => {
    const fetchSettings = async () => {
      const { statusCode, data, error } = await APICaller(`/settings/${getUser()._id}`, "GET");

      if(statusCode === 200) {
        setSettings(data.setting);
        addSettings(data.setting);
      } else {
        console.log(error);
      }
    }

    if(!getSettings()) {
      fetchSettings();
    } else {
      setSettings(getSettings());
    }
  }, [])

  return (
    <main>
      <h1 className="mb-10">Settings</h1>
      <SettingTile title="Theme" description="Select your preffered theme">
        <Select
          name="theme"
          label=""
          value={settings.theme}
          options={[
            { name: "System Theme", value: "system" },
            { name: "Dark Theme", value: "dark" },
            { name: "Light Theme", value: "light" },
          ]}
          onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value as "system" | "dark" | "light" }))}
        />
      </SettingTile>
      <SettingTile title="Github" description="Link your github account">
        <>
          {
            settings.github?.enabled ? (
              <p className="text-primary font-bold flex items-center gap-2">
                Linked
                <Button variant="warning" onClick={() => {}}>
                  <span className="flex items-center gap-2">
                    <GitHub /> Update
                  </span>
                </Button>
              </p>
            ) : (
              <Button variant="dark" onClick={() => {}}>
                <span className="flex items-center gap-2">
                  <GitHub /> Github
                </span>
              </Button>
            )
          }
        </>
      </SettingTile>
      <div className="flex justify-end">
        <Button isLoading={isUpdating} loadingText=" Updating..." variant="primary" onClick={updateSettings}>
          <span className="flex gap-2 items-center">
            <Edit2 />
            Update
          </span>
        </Button>
      </div>
    </main>
  );
};

export default SettingPage;
