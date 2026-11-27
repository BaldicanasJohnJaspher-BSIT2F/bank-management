import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { CustomersService } from './customers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  // Create customer
  @Post()
  create(@Body() data: any) {
    return this.customersService.create(data);
  }

  // Get all customers
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  // Search customer
  @Get('search/:keyword')
  search(@Param('keyword') keyword: string) {
    return this.customersService.search(keyword);
  }

  // Count all customers
  @Get('count')
  countCustomers() {
    return this.customersService.countCustomers();
  }

  // Get customer's accounts
  @Get(':id/accounts')
  findCustomerAccounts(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findCustomerAccounts(id);
  }

  // Get customer by ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  // Update customer
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
  ) {
    return this.customersService.update(id, data);
  }

  // Delete customer
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}