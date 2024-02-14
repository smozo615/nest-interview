import { Employee } from './employee';

export interface EmployeeRepository {
  newId: () => Promise<string>;
  create: (employee: Employee) => Promise<void>;
  update: (employee: Employee) => Promise<void>;
  delete: (employee: Employee) => Promise<void>;
  findAll: (customerId: string) => Promise<Employee[]>;
  findById: (id: string) => Promise<Employee | null>;
}
