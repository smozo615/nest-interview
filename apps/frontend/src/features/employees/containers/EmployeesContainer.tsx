import React, { useEffect, useState } from "react";
import useGetEmployees from "../hooks/useGetEmployees";
import { IEmployees } from "../models/Groups.type";
import EmployeesEditDialog from "../components/EmployeesEditDialog";
import EmployeesTable from "../components/EmployeesTable";
import { GroupsProvider } from "../context/Groups.context";
import EmployeesSettings from "../components/EmployeesSettings";

const EmployeesContainer = () => {
  const { getEmployees } = useGetEmployees();
  const [employeesData, setEmployeesData] = useState<IEmployees[]>();
  const getEmployeesFromApi = async () => {
    const employees = await getEmployees();
    setEmployeesData(employees.data?.employees);
  }

  useEffect(() => {
    getEmployeesFromApi();
  }, [])
  return (
    <GroupsProvider>
      <EmployeesSettings />
      <EmployeesTable employees={employeesData || []} loading={false} updateTable={getEmployeesFromApi} />
      <EmployeesEditDialog getEmployeesFromApi={getEmployeesFromApi} />
    </GroupsProvider>
  );
};

export default EmployeesContainer;
