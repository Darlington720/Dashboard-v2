import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import Reports from "views/Report.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Tables from "views/Tables";
import StudentTable from "views/studentTable.js";
import supportStaffTable from "views/supportStaffTable";
import teachingStaffTable from "views/teachingStaffTable";
import VisitorsTable from "views/VisitorsTable";
import Constraints from "views/Constraints";
import AddConstraint from "views/AddContraint";
import EditConstraint from "views/EditConstraint";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    sidebarName: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/students",
    name: "Students",
    sidebarName: "Student",
    icon: "nc-icon nc-diamond",
    component: StudentTable,
    layout: "/admin",
  },

  {
    path: "/visitors",
    name: "Visitors",
    sidebarName: "Visitors",
    icon: "nc-icon nc-pin-3",
    component: VisitorsTable,
    layout: "/admin",
  },
  {
    path: "/teaching-staff",
    name: "Teaching Staff",
    sidebarName: "Teaching Staff",
    icon: "nc-icon nc-bell-55",
    component: teachingStaffTable,
    layout: "/admin",
  },
  {
    path: "/support-staff",
    name: "Support Staff",
    sidebarName: "Support Staff",
    icon: "nc-icon nc-single-02",
    component: supportStaffTable,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Reports",
    sidebarName: "Reports",
    icon: "nc-icon nc-tile-56",
    component: Reports,
    layout: "/admin",
  },
  {
    path: "/constraints",
    name: "Constraints",
    sidebarName: "Contraints",
    icon: "nc-icon nc-tile-56",
    component: Constraints,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
  },
  {
    path: "/editConstraint",
    name: "Edit Constraint",
    icon: "nc-icon nc-caps-small",
    component: EditConstraint,
    layout: "/admin",
  },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin",
  // },
  {
    pro: true,
    path: "/StudentPage",
    // name: "2000101041",
    // icon: "nc-icon nc-spaceship",
    component: UserPage,
    layout: "/admin",
  },
  {
    // pro: true,
    path: "/addConstraint",
    name: "Add Constraint",
    // icon: "nc-icon nc-spaceship",
    component: AddConstraint,
    layout: "/admin",
  },
];
export default routes;
