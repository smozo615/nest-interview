import { BadRequestException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateCustomerCommand } from './create-customer.command';
import { InjectionToken } from '../../constants';

import { CustomerRepository } from '../../../domain/customer.repository';
import { CustomerFactory } from '../../../domain/customer.factory';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerCommandHandler
  implements ICommandHandler<CreateCustomerCommand, void>
{
  constructor(
    @Inject(InjectionToken.CUSTOMER_REPOSITORY)
    private readonly customerRepository: CustomerRepository,
    private readonly customerFactory: CustomerFactory,
  ) {}

  async execute(command: CreateCustomerCommand) {
    const customerExists = await this.customerRepository.exists(command.email);

    if (customerExists) {
      throw new BadRequestException('Customer already exists');
    }

    const id = await this.customerRepository.newId();

    const customer = this.customerFactory.createCustomer({
      id,
      businessName: command.businessName,
      email: command.email,
      password: command.password,
    });

    await this.customerRepository.create(customer);

    customer.createdSuccessfully();

    customer.commit();
  }
}
