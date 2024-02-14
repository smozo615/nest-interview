import { Test, TestingModule } from '@nestjs/testing';

import { InjectionToken } from '../../constants';
import { CreateEmployeeCommand } from './create-employee.command';
import { CreateEmployeeCommandHandler } from './create-employee.handler';

import { Employee } from '../../../domain/employee';
import { EmployeeFactory } from '../../../domain/employee-factory';
import { EmployeeRepository } from '../../../domain/employee.repository';

describe('CreateEmployeeCommandHandler', () => {
  let handler: CreateEmployeeCommandHandler;
  let repository: EmployeeRepository;
  let factory: EmployeeFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateEmployeeCommandHandler,
        {
          provide: InjectionToken.EMPLOYEE_REPOSITORY,
          useValue: {
            newId: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: EmployeeFactory,
          useValue: {
            createEmployee: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CreateEmployeeCommandHandler>(
      CreateEmployeeCommandHandler,
    );
    repository = module.get<EmployeeRepository>(
      InjectionToken.EMPLOYEE_REPOSITORY,
    );
    factory = module.get<EmployeeFactory>(EmployeeFactory);
  });

  describe('execute', () => {
    it('should create an employee', async () => {
      const command = new CreateEmployeeCommand(
        'John Doe',
        'Hourly',
        20,
        '123',
      );

      const id = repository.newId();

      const employee: Employee = {
        commit: jest.fn(),
        getId: jest.fn().mockReturnValue('456'),
        getName: jest.fn().mockReturnValue('John Doe'),
        getPayType: jest.fn().mockReturnValue('Hourly'),
        getPayRate: jest.fn().mockReturnValue(20),
        getCustomerId: jest.fn().mockReturnValue('123'),
        createdSuccessfully: jest.fn(),
        belongsToCustomer: jest.fn().mockReturnValue(true),
        update: jest.fn(),
      };

      jest.spyOn(repository, 'newId').mockResolvedValueOnce(id);
      jest.spyOn(factory, 'createEmployee').mockReturnValueOnce(employee);

      await handler.execute(command);

      expect(repository.newId).toHaveBeenCalled();
      expect(factory.createEmployee).toHaveBeenCalledWith({
        id,
        name: 'John Doe',
        payType: 'Hourly',
        payRate: 20,
        customerId: '123',
      });
      expect(factory.createEmployee).toHaveReturnedWith(employee);
      expect(repository.create).toHaveBeenCalledWith(employee);
      expect(employee.commit).toHaveBeenCalled();
    });
  });
});
