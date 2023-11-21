import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptions } from '../../config';
import { UsersModule } from '../users/users.module';

import { ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthService } from './services/auth.service';

@Module({
  imports: [UsersModule, JwtModule.registerAsync(JwtOptions)],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
