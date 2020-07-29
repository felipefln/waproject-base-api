import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ITemController } from './controllers/item';
import { OrderController } from './controllers/order';
import { ProfileController } from './controllers/profile';
import { DeviceRepository } from './repositories/device';
import { ITemRepository } from './repositories/item';
import { OrderRepository } from './repositories/order';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { ITemService } from './services/item';
import { OrderService } from './services/order';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, ITemController, OrderController],
  providers: [
    AuthService,
    UserService,
    ITemService,
    UserRepository,
    DeviceRepository,
    ITemRepository,
    OrderService,
    OrderRepository
  ]
})
export class AppModule {}
