import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';

import { CreateCustomerCommand } from './create-customer.command';
import { CreateCustomerCommandHandler } from './create-customer.handler';
import { Customer } from '../../../domain/customer';
import { CustomerRepository } from '../../../domain/customer.repository';
import { InjectionToken } from '../../constants';
import { CustomerFactory } from '../../../domain/customer.factory';

describe('CreateCustomerCommandHandler', () => {
  let handler: ICommandHandler<CreateCustomerCommand, void>;
  let repository: CustomerRepository;
  let factory: CustomerFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCustomerCommandHandler,
        {
          provide: InjectionToken.CUSTOMER_REPOSITORY,
          useValue: {
            exists: jest.fn(),
            newId: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: CustomerFactory,
          useValue: {
            createCustomer: jest.fn(),
          },
        },
      ],
    }).compile();

    handler = module.get<CreateCustomerCommandHandler>(
      CreateCustomerCommandHandler,
    );
    repository = module.get<CustomerRepository>(
      InjectionToken.CUSTOMER_REPOSITORY,
    );
    factory = module.get<CustomerFactory>(CustomerFactory);
  });

  describe('execute', () => {
    it('should create a customer', async () => {
      const command = new CreateCustomerCommand(
        'Business Name',
        'test@example.com',
        'password',
      );

      jest.spyOn(repository, 'exists').mockResolvedValueOnce(false);
      jest.spyOn(repository, 'newId').mockResolvedValueOnce('123');

      const customer: Customer = {
        commit: jest.fn(),
        getId: jest.fn().mockReturnValue('123'),
        getBusinessName: jest.fn().mockReturnValue('Business Name'),
        getEmail: jest.fn().mockReturnValue('test@example.com'),
        getPassword: jest.fn().mockReturnValue('password'),
        createdSuccessfully: jest.fn(),
        update: jest.fn(),
      };

      jest.spyOn(factory, 'createCustomer').mockReturnValueOnce(customer);

      await handler.execute(command);

      expect(repository.exists).toHaveBeenCalledWith('test@example.com');
      expect(repository.newId).toHaveBeenCalled();
      expect(factory.createCustomer).toHaveBeenCalledWith({
        id: '123',
        businessName: 'Business Name',
        email: 'test@example.com',
        password: 'password',
      });
      expect(factory.createCustomer).toHaveReturnedWith(customer);
      expect(repository.create).toHaveBeenCalledWith(customer);
      expect(customer.createdSuccessfully).toHaveBeenCalled();
      expect(customer.commit).toHaveBeenCalled();
    });

    it('should throw BadRequestException if customer already exists', async () => {
      const command = new CreateCustomerCommand(
        'Business Name',
        'test@example.com',
        'password',
      );

      jest.spyOn(repository, 'exists').mockResolvedValueOnce(true);

      await expect(handler.execute(command)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
