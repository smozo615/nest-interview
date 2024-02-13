import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ResponseDescription } from './constants/response-description.constant';
import { CreateEmployeeRequestDto } from './dto/request';
import { PayRatePipe } from './pipes/pay-rate.pipe';

import { CreateEmployeeCommand } from '../application/commands/create-employee/create-employee.command';

import { JwtAuthGuard, RolesGuard } from '../../auth/interface/guards';
import { RolesDecorator } from '../../auth/interface/decorators';
import { Roles } from '../../auth/roles/constants';

@ApiBearerAuth()
@ApiTags('employees')
@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeeController {
  constructor(private readonly commandBus: CommandBus) {}

  @RolesDecorator(Roles.Customer)
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ResponseDescription.CREATED,
  })
  @ApiUnauthorizedResponse({ description: ResponseDescription.UNAUTHORIZED })
  @ApiForbiddenResponse({ description: ResponseDescription.FORBIDDEN })
  @ApiBadRequestResponse({ description: ResponseDescription.BAD_REQUEST })
  @ApiInternalServerErrorResponse({
    description: ResponseDescription.INTERNAL_SERVER_ERROR,
  })
  async createEmployee(
    @Body(PayRatePipe) createEmployeeDto: CreateEmployeeRequestDto,
  ): Promise<void> {
    const userId = '4c242562-d601-4a27-8f7e-12f3c35db131'; // TODO: Get user id from request

    const { name, payType, payRate } = createEmployeeDto;

    const command = new CreateEmployeeCommand(name, payType, payRate, userId);

    await this.commandBus.execute<CreateEmployeeCommand, void>(command);
  }
}
