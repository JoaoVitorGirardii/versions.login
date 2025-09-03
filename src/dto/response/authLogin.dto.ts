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
  user: UserDto;
  token: string;
}
