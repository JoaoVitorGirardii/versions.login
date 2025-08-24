export class AuthLoginResponseDto {
  valid: boolean;
  user?: UserDto;
}

export class UserDto {
  id?: string;
  name: string;
  email: string;
}
