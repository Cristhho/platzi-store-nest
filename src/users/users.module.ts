import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users/users.controller';
import { CustomersController } from './controllers/customer/customer.controller';
import { UserService } from './services/user/user.service';
import { CustomerService } from './services/customer/customer.service';

@Module({
  controllers: [UsersController, CustomersController],
  providers: [UserService, CustomerService],
})
export class UsersModule {}
