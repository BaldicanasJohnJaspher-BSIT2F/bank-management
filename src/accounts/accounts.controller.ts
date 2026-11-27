import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Post()
  create(@Body() data: any) {
    return this.accountsService.create(data);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  // Count all accounts
  @Get('count')
  countAccounts() {
    return this.accountsService.countAccounts();
  }

  // Filter accounts by type
  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.accountsService.findByType(type);
  }

  // Filter accounts by status
  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.accountsService.findByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
  ) {
    return this.accountsService.update(id, data);
  }

  // Update account status
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return this.accountsService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.remove(id);
  }
}