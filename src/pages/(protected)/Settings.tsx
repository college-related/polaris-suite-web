import { useEffect, useState } from "react";
import { Edit2, GitHub } from "react-feather";

import Button from "../../components/Button";
import SettingTile from "../../components/settings/SettingTile";
import Select from "../../components/form/Select";
import { APICaller } from "../../helpers/api";
import { addSettings, getSettings, getUser } from "../../helpers/cookie";
import { Link, useSearchParams } from "react-router-dom";

const SettingPage = () => {

  const [search] = useSearchParams();
  const [settings, setSettings] = useState<Partial<Settings>>({
    theme: "system",
    github: {
      enabled: false,
      installationId: "",
    },
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const updateSettings = async (enabled: boolean = false, installationId: string = "") => {

    let toSendSettings: Partial<Settings> = {
      theme: settings.theme,
    };

    if(enabled) {
      toSendSettings.github = {
        enabled,
        installationId: installationId,
      }
    }

    const { statusCode, data, error } = await APICaller(`/settings/${getUser()._id}`, "PATCH", toSendSettings);

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

    if(JSON.stringify(getSettings()) === '{}') {
      fetchSettings();
    } else {
      setSettings(getSettings());
    }
  }, [])

  useEffect(() => {
    if(search.get("installation_id") && search.get("setup_action") === "install") {
      setSettings(prev => ({
        ...prev,
        github: {
          enabled: true,
          installationId: search.get("installation_id") as string,
        }
      }))

      updateSettings(true, search.get("installation_id") as string);
    }
  }, [search])

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
      <SettingTile title="Github" description="Install our application with your github account">
        <>
          {
            settings.github?.enabled ? (
              <p className="flex items-center gap-2 font-bold text-primary">
                Linked
                <Link to="https://github.com/apps/polaris-suite/installations/select_target">
                  <span className="flex items-center gap-2 p-3 rounded-md text-warning bg-warning_light">
                    <GitHub /> Update
                  </span>
                </Link>
              </p>
            ) : (
              <Link to="https://github.com/apps/polaris-suite/installations/select_target">
                <span className="flex items-center gap-2 p-3 text-white rounded-md bg-dark">
                  <GitHub /> Github
                </span>
              </Link>
            )
          }
        </>
      </SettingTile>
      <div className="flex justify-end">
        <Button isLoading={isUpdating} loadingText=" Updating..." variant="primary" onClick={updateSettings}>
          <span className="flex items-center gap-2">
            <Edit2 />
            Update
          </span>
        </Button>
      </div>
    </main>
  );
};

export default SettingPage;
