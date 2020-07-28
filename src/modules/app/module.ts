import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { ProfileController } from './controllers/profile';
import { DeviceRepository } from './repositories/device';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { UserService } from './services/user';
import { ITemController } from './controllers/item';
import { ITemService } from './services/item';
import { ITemRepository } from './repositories/item';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, ITemController],
  providers: [AuthService, UserService, ITemService, UserRepository, DeviceRepository, ITemRepository]
})
export class AppModule {}
