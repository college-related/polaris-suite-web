import { Link, useLocation, useNavigate } from "react-router-dom";
import { Grid, HardDrive, Settings } from "react-feather";

import { sidebar } from "../utils/sidebar";
import { POLARIS_LOCALSTORAGE_TOKEN, POLARIS_LOCALSTORAGE_USER } from "../utils/constants";
import { polaris_logo } from "../assets/images";

export default function Sidebar() {

    const navigate = useNavigate();
    const location = useLocation();
  
    const logout = async () => {
        // remove user and token from localstorage
        localStorage.removeItem(POLARIS_LOCALSTORAGE_USER);
        localStorage.removeItem(POLARIS_LOCALSTORAGE_TOKEN);

        // redirect to login page
        navigate("/auth/login");
    }

    const sidebarIcons = [<Grid />, <HardDrive />, <Settings />];

    return (
    <div className="col-span-1 p-5 h-screen border-r font-quicksand flex flex-col justify-between tracking-wide">
        <div>
            <span className="flex items-center gap-2">
                <img src={polaris_logo} alt="polaris suite logo" />
                <p className="text-3xl font-bold font-sen">Polaris Suite</p>
            </span>
            <nav className="mt-10">
                <ul>
                    {
                        sidebar.map((item, index) => (
                            <Link key={index} to={`/polaris/${item.link}`}>
                                <li className={`flex gap-5 py-3 px-2 my-4 rounded-md font-bold ${location.pathname.split("/")[2] === item.link && "bg-primary text-white"}`}>
                                    {sidebarIcons[index]}
                                    {item.title}
                                </li>
                            </Link>
                        ))
                    }
                </ul>
            </nav>
        </div>
        <button onClick={logout} className="text-red-700 font-bold">Logout</button>
    </div>
  )
}
