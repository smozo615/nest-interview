import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from '../libs/database/database.module';
import { EmployeeModule } from './employees/employee.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, DatabaseModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
