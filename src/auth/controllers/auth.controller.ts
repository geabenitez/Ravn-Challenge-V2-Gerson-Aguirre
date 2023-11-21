import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  DTOAuthProcessSignInRequest,
  DTOAuthProcessSignInResponse,
  DTOAuthProcessSignOutResponse,
  DTOAuthProcessSignUpRequest,
  DTOAuthProcessSignUpResponse,
} from '../_dtos/auth.dto';
import { Public } from '../decorators/auth.decorator';
import { GetUser } from '../decorators/user.decorator';
import { AuthService } from '../services/auth.service';

@ApiTags('AUTH')
@Controller({
  path: '/',
  version: '1',
})
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('signin')
  async processSignIn(
    @Body() data: DTOAuthProcessSignInRequest,
  ): Promise<DTOAuthProcessSignInResponse> {
    this.logger.log(`Processing login for ${data.username}`);
    return await this.service.processSignIn(data);
  }

  @Public()
  @Post('signup')
  async processSignUp(
    @Body() data: DTOAuthProcessSignUpRequest,
  ): Promise<DTOAuthProcessSignUpResponse> {
    this.logger.log(`Processing register`);
    return this.service.processSignUp(data);
  }

  @Post('signout')
  @ApiBearerAuth()
  async processSignOut(
    @GetUser() user: string,
  ): Promise<DTOAuthProcessSignOutResponse> {
    this.logger.log(`Processing register`);
    return this.service.processSignOut(user);
  }
}
