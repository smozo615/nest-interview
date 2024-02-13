import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateEmployeeCommand } from './create-employee.command';
import { InjectionToken } from '../../constants';

import { EmployeeRepository } from '../../../domain/employee.repository';
import { EmployeeFactory } from '../../../domain/employee-factory';

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler
  implements ICommandHandler<CreateEmployeeCommand, void>
{
  constructor(
    @Inject(InjectionToken.EMPLOYEE_REPOSITORY)
    private readonly employeeRepository: EmployeeRepository,
    private readonly employeeFactory: EmployeeFactory,
  ) {}

  async execute(command: CreateEmployeeCommand) {
    const id = await this.employeeRepository.newId();

    const employee = this.employeeFactory.createEmployee({
      id,
      name: command.name,
      payType: command.payType,
      payRate: command.payRate,
      customerId: command.customerId,
    });

    await this.employeeRepository.create(employee);

    employee.createdSuccessfully();

    employee.commit();
  }
}
