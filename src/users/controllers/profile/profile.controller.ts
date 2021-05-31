import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { OrderService } from '../../services/order/order.service';
import { UserService } from '../../services/user/user.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../auth/decorators/roles.decorator';
import { Role } from '../../../auth/models/roles.model';
import { PayloadToken } from '../../../auth/models/token.model';

@ApiTags('profile')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profile')
export class ProfileController {
  constructor(
    private orderService: OrderService,
    private userService: UserService,
  ) {}

  @Roles(Role.CUSTOMER)
  @Get()
  getProfile(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.userService.findOne(user.sub);
  }

  @Roles(Role.CUSTOMER)
  @Get('my-orders')
  getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    return this.orderService.ordersByCustomer(user.sub);
  }
}
