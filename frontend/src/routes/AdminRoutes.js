
import AdministrationRoutes from "./AdministrationRoutes.js";
import CMSRoutes from "./CMSRoutes.js";

const AdminRoutes = [...AdministrationRoutes, ...CMSRoutes];

export default AdminRoutes;
