import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// application layer
import { InjectionToken } from './application/constants';
import { CreateEmployeeHandler } from './application/commands/create-employee/create-employee.handler';
import { CreatedEmployeeHandler } from './application/events/created-employee-handler.event';

// domain layer
import { EmployeeFactory } from './domain/employee-factory';

// infrastructure layer
import { EmployeeRepositoryImplementation } from './infrastructure/repositories/Employee-repository-implementation';

// interface layer
import { EmployeeController } from './interface/employee.controller';
import { PayRatePipe } from './interface/pipes/pay-rate.pipe';

const application: Provider[] = [CreateEmployeeHandler, CreatedEmployeeHandler];

const domain: Provider[] = [EmployeeFactory];

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.EMPLOYEE_REPOSITORY,
    useClass: EmployeeRepositoryImplementation,
  },
];

@Module({
  imports: [CqrsModule],
  controllers: [EmployeeController],
  providers: [...application, ...domain, ...infrastructure, PayRatePipe],
})
export class EmployeeModule {}
