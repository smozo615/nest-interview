import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { CommandBus } from '@nestjs/cqrs';

import { CreateEmployeeCommand } from '../application/commands/create-employee/create-employee.command';
import { CreateEmployeeRequestDto } from './dto/request';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [CommandBus],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  describe('createEmployee', () => {
    it('should create an employee', async () => {
      const createEmployeeDto: CreateEmployeeRequestDto = {
        name: 'John Doe',
        payType: 'Hourly',
        payRate: 20,
      };

      const customerId = '123'; // TODO: Set the user id from the request

      const command = new CreateEmployeeCommand(
        createEmployeeDto.name,
        createEmployeeDto.payType,
        createEmployeeDto.payRate,
        customerId,
      );

      jest.spyOn(commandBus, 'execute').mockResolvedValueOnce(command);

      await controller.createEmployee(createEmployeeDto);

      expect(commandBus.execute).toHaveBeenCalledWith(command);
    });
  });
});
