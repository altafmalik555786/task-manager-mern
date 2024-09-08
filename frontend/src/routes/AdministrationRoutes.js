import admissionStatusIcon from "../assets/img/sibar/admissionStatusIcon.png";
import { constRoute } from "utils/constants";
import ManageAuctionsRed from 'assets/img/sibar/green/manage-auction.svg'
import ManageAuctionsGrey from 'assets/img/sibar/grey/manage-auctions.svg'
import TasksList from "views/screens/Task-Manager";

const AdministrationRoutes = [
  {
    path: "/administration",
    name: "Administration",
    icon: admissionStatusIcon,
    component: null,
    layout: "/admin",
    subPath: true,
    type: "administration",
    subMenu: [
      {
        path: constRoute?.tasks,
        name: "Task Manager",
        icon: ManageAuctionsRed,
        activeIcon: ManageAuctionsGrey,
        component: TasksList,
        layout: "/admin",
        subPath: true,
        sideMenuTitle: "Task Manager",
      }
    ],
  },
];
export default AdministrationRoutes;
