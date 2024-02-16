import { ROUTER_LINK_EMPLOYEES } from "@ocmi/frontend/constants/routes-link.constants";
import { TITLE_MODULE_EMPLEADOS } from "@ocmi/frontend/constants/title.constants";
import { AdminLayout } from "@ocmi/frontend/features/commons";
import EmployeesContainer from "@ocmi/frontend/features/employees/containers/EmployeesContainer";
import { setAppBarTitle } from "@ocmi/frontend/redux/slices/app.slice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function EmployeesPage() {
    const dispatcher = useDispatch();
    const router = useRouter();
    router.push(ROUTER_LINK_EMPLOYEES);
    useEffect(() => {
      dispatcher(setAppBarTitle(TITLE_MODULE_EMPLEADOS));
    }, [dispatcher]);
    return <AdminLayout>
    <EmployeesContainer />
    </AdminLayout>
}
