import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginResponseDto {
  valid: boolean;
  user?: UserDto;
  tokenJwt?: string;
}

export class UserDto {
  id?: string;
  name: string;
  email: string;
}

export class ResponseLoginDto {
  @ApiProperty({ description: 'Dados basicos do usuário' })
  user: UserDto;

  @ApiProperty({ description: 'Token de acesso do usuário' })
  token: string;
}
