import { Link, useLocation, useNavigate } from "react-router-dom";
import { Airplay, Layout, LogOut, Settings } from "react-feather";

import { sidebar } from "../utils/sidebar";
import { POLARIS_LOCALSTORAGE_TOKEN, POLARIS_LOCALSTORAGE_USER } from "../utils/constants";
import { useModel } from "../utils/hooks/useModel";
import AlertModel from "./portal/AlertModel";
import IconButton from "./IconButton";

export default function Sidebar() {

  const navigate = useNavigate();
  const location = useLocation();
  const { isModelOpen, openModel, closeModel } = useModel();

  const logout = async () => {
    // remove user and token from localstorage
    localStorage.removeItem(POLARIS_LOCALSTORAGE_USER);
    localStorage.removeItem(POLARIS_LOCALSTORAGE_TOKEN);

    // redirect to login page
    navigate("/auth/login");
  }

  const sidebarIcons = [<Layout className="w-5 h-5" />, <Airplay className="w-5 h-5" />, <Settings className="w-5 h-5" />];

  return (
    <div className="bg-neutral_white border-r flex flex-col justify-between py-4 px-5">
      <nav>
        <ul className="w-fit mx-auto">
          {
            sidebar.map((item, index) => (
              <Link key={index} to={`/polaris/${item.link}`}>
                <li className={`p-3 my-4 rounded-md ${location.pathname.split("/")[2] === item.link && "bg-primary_light text-primary"}`}>
                  {sidebarIcons[index]}
                </li>
              </Link>
            ))
          }
        </ul>
      </nav>
      <IconButton onClick={openModel} variant="danger" icon={<LogOut className="w-5 h-5" />} />
      {isModelOpen && (<AlertModel closeModel={closeModel} handleConfirm={logout} title="Log out" message="Do you want to log out?" />)}
    </div>
  )
}
