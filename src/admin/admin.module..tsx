import { FC } from "react";
import { ServiceContainer } from "react-service-locator";
import { AdminCompanyStore } from "./admin-company/admin-company.store";
import AdminRoutingModule from "./admin.routing";

const AdminModule: FC = () => (
  <ServiceContainer services={[AdminCompanyStore]}>
    <AdminRoutingModule />
  </ServiceContainer>
);
export default AdminModule;
