import { Employee } from './employee';

export interface EmployeeRepository {
  newId: () => Promise<string>;
  create: (employee: Employee) => Promise<void>;
  update: (employee: Employee) => Promise<void>;
  delete: (employee: Employee) => Promise<void>;
  findAll: () => Promise<Employee[]>;
  findById: (id: string) => Promise<Employee>;
}
