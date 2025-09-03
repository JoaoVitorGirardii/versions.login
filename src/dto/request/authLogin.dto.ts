import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({
    example: 'exemplo@email.com',
    description: 'Email do usuário',
  })
  user: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '123123',
  })
  password: string;
}

export class UserCreate {
  @ApiProperty({
    example: 'exemplo@email.com',
    description: 'Email do usuário',
  })
  email: string;

  @ApiProperty({
    example: 'Zézinho junior',
    description: 'Nome do usuário',
  })
  name: string;

  @ApiProperty({
    example: '123123',
    description: 'Senha do usuário',
  })
  password: string;
}
