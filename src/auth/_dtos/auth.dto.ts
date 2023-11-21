import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SimpleResponse } from '../../../config/types';
import {
  AuthProcessSignInRequest,
  AuthProcessSignInResponse,
  AuthProcessSignUpRequest,
} from '../_types/auth.types';

export class DTOAuthProcessSignInRequest implements AuthProcessSignInRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Username', example: 'gfring' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password', example: '123456789' })
  password: string;
}

export class DTOAuthProcessSignInResponse implements AuthProcessSignInResponse {
  access_token: string;
}

export class DTOAuthProcessSignUpRequest
  extends DTOAuthProcessSignInRequest
  implements AuthProcessSignUpRequest {}

export class DTOAuthProcessSignUpResponse implements SimpleResponse {
  id?: string;
  message: string;
}

export class DTOAuthProcessSignOutResponse implements SimpleResponse {
  message: string;
}
