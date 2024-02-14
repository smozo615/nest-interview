import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from '../libs/database/database.module';
import { EmployeeModule } from './employees/employee.module';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [AuthModule, DatabaseModule, EmployeeModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
